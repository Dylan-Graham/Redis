import express, { Request, Response } from "express";
import pool from "./db";
import { client } from "./redis";

const app = express();
const port = 3000;
const defaultSchema = "social";

app.get("/", (req: Request, res: Response) => {
  res.send("Server is alive!");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${defaultSchema}.users`);
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/users-redis", async (req: Request, res: Response) => {
  try {
    const redisClient = await client;

    // look for redis cache
    const value = await redisClient.get("users-redis");
    if (value) {
      res.json(value);
      return;
    }

    // else find in db, then update cache
    const dbClient = await pool.connect();
    const result = await dbClient.query(`SELECT * FROM ${defaultSchema}.users`);
    if (!result) throw Error("No users found.");
    dbClient.release();
    res.json(result.rows);

    // cache result (expires after 10 minutes)
    await redisClient.set("redis-user", JSON.stringify(result.rows), {
      EX: 600,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${defaultSchema}.posts`);
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/comments", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM ${defaultSchema}.comments`
    );
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
