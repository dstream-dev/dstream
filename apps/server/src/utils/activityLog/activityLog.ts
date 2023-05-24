export function activityLog(
  activity: string,
  data: {
    event_name: string;
    user_id: string;
    organization_id?: string;
    description: string;
  },
) {
  console.log(activity, data);
}
