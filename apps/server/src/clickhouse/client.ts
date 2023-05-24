import { createClient } from "@clickhouse/client";
import "dotenv/config";

export const clickhouseClient = createClient({
  host: process.env.CLICKHOUSE_URL,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
});
