import { clickhouseClient } from "src/clickhouse";
import { v4 } from "uuid";
import { formatDate } from "../formate_date";

export async function activityLog({
  activity_type,
  by,
  org_id,
  activity,
  activity_id,
}: {
  activity_type: string;
  by: string;
  org_id: string;
  activity: string;
  activity_id: string;
}) {
  try {
    await clickhouseClient.insert({
      table: `logs_${org_id}`,
      values: [
        {
          id: v4(),
          activity_type,
          by,
          activity,
          activity_id,
          org_id,
          created_at: await formatDate(new Date().toISOString()),
        },
      ],
      format: "JSONEachRow",
    });
  } catch (err) {
    throw new Error(err);
  }
}
