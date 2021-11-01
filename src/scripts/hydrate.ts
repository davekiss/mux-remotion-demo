// Fetch the data before the render, and store it as a JSON file, then import this JSON file.
require('dotenv').config()

import * as fs from "fs/promises";
import { subMonths, getUnixTime } from 'date-fns'

import axios from "axios";

type GroupBy = "viewer_device_category" | "video_title" | "country"
type OrderBy = "views"
type DataType = "overall" | "breakdown"

type Request = {
  type: DataType;
  outputFilename: string;
  group_by?: GroupBy;
  order_by?: OrderBy;
  limit?: number;
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

const username = process.env.MUX_PUBLIC_KEY;
const password = process.env.MUX_SECRET_KEY;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
}

const REQUESTS: Request[] = [
  {
    type: "overall", outputFilename: "overall.json"
  },
  {
    type: "breakdown",
    outputFilename: "views_by_title.json",
    group_by: "video_title",
    order_by: "views",
    limit: 10,
  },
  {
    type: "breakdown",
    outputFilename: "views_by_country.json",
    group_by: "country",
    order_by: "views",
    limit: 5,
  },
  {
    type: "breakdown",
    outputFilename: "views_by_device.json",
    group_by: "viewer_device_category",
    order_by: "views",
    limit: 5,
  }
];

const now = new Date();
const one_month_ago = getUnixTime(subMonths(now, 1));
const two_months_ago = getUnixTime(subMonths(now, 2));
const pastMonthTimeframe = `timeframe[]=${one_month_ago}&timeframe[]=${getUnixTime(now)}`;
const previousMonthTimeframe = `timeframe[]=${two_months_ago}&timeframe[]=${one_month_ago}`

const fetchData = async (type: DataType, querystring: string) => {
  const [pastMonthResponse, previousMonthResponse] = await Promise.all([
    axios.get(`https://api.mux.com/data/v1/metrics/views/${type}?${pastMonthTimeframe}${querystring}`, { headers }),
    axios.get(`https://api.mux.com/data/v1/metrics/views/${type}?${previousMonthTimeframe}${querystring}`, { headers })
  ])

  return [pastMonthResponse.data, previousMonthResponse.data];
}

const hydrate = async () => {
  await fs.mkdir("./data");

  await Promise.all(
    REQUESTS.map(async ({ type, group_by, limit, order_by, outputFilename }) => {
      const querystring = type === "breakdown" ? `&group_by=${group_by}&limit=${limit}&order_by=${order_by}` : "";
      const response = await fetchData(type, querystring);
      await fs.writeFile(`./data/${outputFilename}`, JSON.stringify(response));
    }))
}

hydrate();
