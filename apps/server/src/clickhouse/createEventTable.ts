import { clickhouseClient } from "./client";

export async function createEventTable(org_id: string) {
  await clickhouseClient.exec({
    query: `CREATE TABLE IF NOT EXISTS events_${org_id} (
      id UUID,
      org_id String,
      customer_id String,
      event_name String,
      properties JSON,
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
