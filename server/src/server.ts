import express, { Request, Response } from "express";
import pool from "./db";

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
