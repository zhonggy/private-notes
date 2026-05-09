import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { beforeAll, describe, it, expect } from "vitest";
import worker from "../src";

describe("private-notes worker", () => {
	beforeAll(async () => {
		await env.DB.prepare(
			`CREATE TABLE IF NOT EXISTS auth_rate_limits (
				key TEXT PRIMARY KEY,
				attempts INTEGER NOT NULL,
				first_attempt_at INTEGER NOT NULL,
				locked_until INTEGER NOT NULL,
				updated_at INTEGER NOT NULL
			)`
		).run();
		await env.DB.prepare(
			`CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_updated_at
			 ON auth_rate_limits(updated_at)`
		).run();
	});

	it("serves the app shell at /", async () => {
		const request = new Request<unknown, IncomingRequestCfProperties>("http://example.com/");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("text/html");
		expect(await response.text()).toContain("Private Notes");
	});

	it("reports an authenticated session when password auth is not configured", async () => {
		const response = await SELF.fetch("http://example.com/api/session");
		await expect(response.json()).resolves.toMatchObject({
			ok: true,
			authenticated: true,
		});
	});

	it("issues and verifies a signed session cookie when password auth is configured", async () => {
		const testEnv = {
			...env,
			APP_PASSWORD: "correct-password",
			COOKIE_SECRET: "test-cookie-secret-with-enough-entropy",
		};

		const loginRequest = new Request<unknown, IncomingRequestCfProperties>("http://example.com/api/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ password: "correct-password" }),
		});
		const loginCtx = createExecutionContext();
		const loginResponse = await worker.fetch(loginRequest, testEnv, loginCtx);
		await waitOnExecutionContext(loginCtx);

		expect(loginResponse.status).toBe(200);
		const cookie = loginResponse.headers.get("set-cookie") || "";
		expect(cookie).toContain("session=");
		expect(cookie).toContain("HttpOnly");
		expect(cookie).toContain("Max-Age=2592000");

		const sessionRequest = new Request<unknown, IncomingRequestCfProperties>("http://example.com/api/session", {
			headers: { cookie },
		});
		const sessionCtx = createExecutionContext();
		const sessionResponse = await worker.fetch(sessionRequest, testEnv, sessionCtx);
		await waitOnExecutionContext(sessionCtx);

		await expect(sessionResponse.json()).resolves.toMatchObject({
			ok: true,
			authenticated: true,
		});
	});

	it("rejects an incorrect password", async () => {
		const testEnv = {
			...env,
			APP_PASSWORD: "correct-password",
			COOKIE_SECRET: "test-cookie-secret-with-enough-entropy",
		};

		const request = new Request<unknown, IncomingRequestCfProperties>("http://example.com/api/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ password: "wrong-password" }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, testEnv, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(401);
	});

	it("rate limits repeated failed logins from the same client", async () => {
		const testEnv = {
			...env,
			APP_PASSWORD: "correct-password",
			COOKIE_SECRET: `test-cookie-secret-${crypto.randomUUID()}`,
		};

		let response: Response | undefined;
		for (let i = 0; i < 5; i += 1) {
			const request = new Request<unknown, IncomingRequestCfProperties>("http://example.com/api/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
					"cf-connecting-ip": "203.0.113.10",
					"user-agent": "rate-limit-test",
				},
				body: JSON.stringify({ password: "wrong-password" }),
			});
			const ctx = createExecutionContext();
			response = await worker.fetch(request, testEnv, ctx);
			await waitOnExecutionContext(ctx);
		}

		expect(response?.status).toBe(429);
		expect(response?.headers.get("retry-after")).toBeTruthy();

		const lockedRequest = new Request<unknown, IncomingRequestCfProperties>("http://example.com/api/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"cf-connecting-ip": "203.0.113.10",
				"user-agent": "rate-limit-test",
			},
			body: JSON.stringify({ password: "correct-password" }),
		});
		const lockedCtx = createExecutionContext();
		const lockedResponse = await worker.fetch(lockedRequest, testEnv, lockedCtx);
		await waitOnExecutionContext(lockedCtx);

		expect(lockedResponse.status).toBe(429);
	});
});
