import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Database from 'better-sqlite3';
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const dbPath = path.join(__dirname, process.env.DB_PATH || './database/todo.db') 

const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

app.use(express.json());


app.get("/", (req: Request, res: Response) =>
{
    const data = db.prepare('SELECT * FROM tasks').all();
    res.json(data);
});

app.listen(port, () =>
{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});