CREATE TABLE IF NOT EXISTS image_assets (
  id TEXT PRIMARY KEY,
  vault_id TEXT NOT NULL,
  object_key TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_image_assets_vault_created_at
ON image_assets(vault_id, created_at DESC);
