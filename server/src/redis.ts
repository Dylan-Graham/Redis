import { createClient } from "redis";

export const client = createClient({
  url: "redis://redis:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
