import { clickhouseClient } from "./client";

export async function createLogTable(org_id: string) {
  await clickhouseClient.exec({
    query: `CREATE TABLE IF NOT EXISTS logs_${org_id} (
      id UUID,
      org_id String,
      by String,
      activity_type String,
      activity_id Nullable(String),
      activity String,
      created_at DateTime
    ) ENGINE = MergeTree()
    PARTITION BY toYYYYMM(created_at)
    ORDER BY (created_at, id)
    SETTINGS index_granularity = 8192`,
    clickhouse_settings: {
      wait_end_of_query: 1,
      allow_experimental_object_type: 1,
      allow_experimental_lightweight_delete: 1,
    },
  });
}
