import * as React from "react";
import { subMonths, getUnixTime } from 'date-fns'

export default function useTimeframes() {

  const now = React.useMemo(() => new Date(), []);
  const one_month_ago = React.useMemo(() => getUnixTime(subMonths(now, 1)), [now]);
  const two_months_ago = React.useMemo(() => getUnixTime(subMonths(now, 2)), [now]);

  return {
    previousMonth: [two_months_ago, one_month_ago],
    pastMonth: [one_month_ago, getUnixTime(now)],
  }
}