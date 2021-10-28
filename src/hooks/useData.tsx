import * as React from "react";
import { subMonths, getUnixTime } from 'date-fns'

type GroupBy = "viewer_device_category" | "video_title"
type OrderBy = "views"
type DataType = "overall" | "breakdown"

type Breakdown = {
  total_watch_time: number
  total_playing_time: number;
  views: number;
  field: string;
}

type OverallData = {
  total_views: number;
  total_watch_time: number;
  total_playing_time: number;
}

export type BreakdownResponse = {
  data: Breakdown[]
  timeframe: number[];
}

export type OverallResponse = {
  data: OverallData;
  timeframe: number[];
}

const headers = new Headers();
const username = process.env.MUX_PUBLIC_KEY;
const password = process.env.MUX_SECRET_KEY;
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

export default function useData<T>({
  type,
  group_by,
  limit = 10,
  order_by = "views" }: {
    type: DataType;
    group_by?: GroupBy;
    order_by?: OrderBy;
    limit?: number;
  }) {
  const now = React.useMemo(() => new Date(), []);
  const one_month_ago = React.useMemo(() => getUnixTime(subMonths(now, 1)), [now]);
  const two_months_ago = React.useMemo(() => getUnixTime(subMonths(now, 2)), [now]);

  const [data, set] = React.useState<T[] | null>(null);

  const querystring = type === "breakdown" ? `&group_by=${group_by}&limit=${limit}&order_by=${order_by}` : "";

  React.useEffect(() => {
    const fetchData = async () => {
      const pastMonthTimeframe = `timeframe[]=${one_month_ago}&timeframe[]=${getUnixTime(now)}`;
      const previousMonthTimeframe = `timeframe[]=${two_months_ago}&timeframe[]=${one_month_ago}`

      const [pastMonthResponse, previousMonthResponse] = await Promise.all([
        fetch(`https://api.mux.com/data/v1/metrics/views/${type}?${pastMonthTimeframe}${querystring}`, { headers }),
        fetch(`https://api.mux.com/data/v1/metrics/views/${type}?${previousMonthTimeframe}${querystring}`, { headers })
      ])

      const pastMonth: T = await pastMonthResponse.json();
      const previousMonth: T = await previousMonthResponse.json();
      set([pastMonth, previousMonth]);
    }

    fetchData();
  }, []);

  return data;
}