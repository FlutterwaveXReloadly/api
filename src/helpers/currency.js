import fetch from "./fetch";
import { env } from "../config/env";

export const convert = async (from, to) => {
  const response = await fetch(
    `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${env.CURR_CONV_KEY}`,
    "GET",
    { Accept: "application/json" }
  );
    return response;
};
