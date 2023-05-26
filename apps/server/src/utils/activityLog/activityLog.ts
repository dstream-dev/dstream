export function activityLog(
  activity: string,
  data: {
    event_name: string;
    by: string;
    organization_id?: string;
    description: string;
  },
) {
  console.log(activity, data);
}
