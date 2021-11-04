// Fetch the data before the render, and store it as a JSON file, then import this JSON file.
require('dotenv').config()

import * as fs from "fs/promises";
import { subMonths, getUnixTime } from 'date-fns'

import axios from "axios";

type Metric = "views" | "unique_viewers"
type GroupBy = "viewer_device_category" | "video_title" | "country" | "browser"
type OrderBy = "views" | "playing_time" | "field" | "value"
type OrderDirection = "asc" | "desc"
type DataType = "overall" | "breakdown"

type Request = {
  type: DataType;
  outputFilename: string;
  metric: Metric;
  group_by?: GroupBy;
  order_by?: OrderBy;
  limit?: number;
  order_direction?: OrderDirection;
}

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

type BreakdownResponse = {
  data: Breakdown[]
  timeframe: number[];
}

type OverallResponse = {
  data: OverallData;
  timeframe: number[];
}

const username = process.env.MUX_TOKEN_ID;
const password = process.env.MUX_TOKEN_SECRET;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
}

const REQUESTS: Request[] = [
  // Overall video viewership stats
  {
    metric: "views", type: "overall", outputFilename: "overall.json"
  },

  // Number of views by video title
  {
    metric: "views",
    type: "breakdown",
    outputFilename: "views_by_title.json",
    group_by: "video_title",
    order_by: "views",
    limit: 10,
  },
  {
    metric: "unique_viewers",
    type: "breakdown",
    outputFilename: "unique_viewers_by_country.json",
    group_by: "country",
    order_by: "value",
    limit: 50,
  },
  {
    metric: "unique_viewers",
    type: "breakdown",
    outputFilename: "unique_viewers_by_browser.json",
    group_by: "browser",
    order_by: "value",
    limit: 10,
  },
  {
    metric: "views",
    type: "breakdown",
    outputFilename: "views_by_device.json",
    group_by: "viewer_device_category",
    order_by: "views",
    limit: 5,
  },
  {
    metric: "views",
    type: "breakdown",
    outputFilename: "playing_time_by_title.json",
    group_by: "video_title",
    order_by: "playing_time",
    limit: 5,
    order_direction: "asc"
  }
];

const now = new Date();
const one_month_ago = getUnixTime(subMonths(now, 1));
const two_months_ago = getUnixTime(subMonths(now, 2));
const pastMonthTimeframe = `timeframe[]=${one_month_ago}&timeframe[]=${getUnixTime(now)}`;
const previousMonthTimeframe = `timeframe[]=${two_months_ago}&timeframe[]=${one_month_ago}`

const fetchData = async (metric: Metric, type: DataType, querystring: string) => {
  const [pastMonthResponse, previousMonthResponse] = await Promise.all([
    axios.get(`https://api.mux.com/data/v1/metrics/${metric}/${type}?${pastMonthTimeframe}${querystring}`, { headers }),
    axios.get(`https://api.mux.com/data/v1/metrics/${metric}/${type}?${previousMonthTimeframe}${querystring}`, { headers })
  ])

  return [pastMonthResponse.data, previousMonthResponse.data];
}

const hydrate = async () => {
  const dir = "./src/data";
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir("./src/data");

  await Promise.all(
    REQUESTS.map(async ({ type, metric, group_by, limit, order_by, order_direction = "desc", outputFilename }) => {
      const querystring = type === "breakdown" ? `&group_by=${group_by}&limit=${limit}&order_by=${order_by}&order_direction=${order_direction}` : "";
      const response = await fetchData(metric, type, querystring);
      await fs.writeFile(`./src/data/${outputFilename}`, JSON.stringify(response));
    }))
}

hydrate();
