import * as React from "react";
import useTimeframes from "./useTimeframes"

type TimeframeRange = "pastMonth" | "previousMonth"

type Breakdown = {
  total_watch_time: number
  total_playing_time: number;
  views: number;
  field: string;
}

type BreakdownResponse = {
  data: Breakdown[];
  timeframe: number[];
}

const headers = new Headers();
const username = process.env.MUX_PUBLIC_KEY;
const password = process.env.MUX_SECRET_KEY;
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

export default function useData({ timeframe = "pastMonth", group_by, limit = 10, order_by = "views" }: { timeframe: TimeframeRange; group_by: string; limit: number; order_by: string; }) {
  const [data, set] = React.useState<BreakdownResponse | null>(null);
  const timeframes = useTimeframes();

  let range: string;
  if (timeframe === "pastMonth") {
    range = timeframes.pastMonthQuery
  } else if (timeframe === "previousMonth") {
    range = timeframes.previousMonthQuery;
  } else {
    throw new Error('Timeframe not found.')
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.mux.com/data/v1/metrics/views/breakdown?${range}&group_by=${group_by}&limit=${limit}&order_by=${order_by}`, { headers })
      const json = await response.json() as BreakdownResponse
      set(json)
    }
    fetchData();
  }, []);

  return { data }
}