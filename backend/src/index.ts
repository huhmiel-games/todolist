import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Database from 'better-sqlite3';
import path from "path";
import { isTask } from "./typeguards";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const dbPath = path.join(__dirname, process.env.DB_PATH || './database/todo.db')

const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

app.use(express.json());

// Add headers to handle cors
app.use(function (req, res, next)
{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// return all todos 
app.get("/", (req: Request, res: Response) =>
{
    try
    {
        const data = db.prepare('SELECT * FROM tasks ORDER BY id DESC, done ASC').all();

        res.json(data ?? []);
    }
    catch (error)
    {
        res.status(500).json();
    }
});

// return one todo
app.get("/:id", (req: Request, res: Response) =>
{
    try
    {
        const data = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);

        if (data !== undefined)
        {
            res.status(200).json(data);
        }
        else
        {
            res.status(404).json({ error: 'no task with this id' });
        }
    }
    catch (error)
    {
        res.status(500).json();
    }
});

// add a new todo
app.post("/", (req: Request, res: Response) =>
{
    try
    {
        const data = db.prepare('INSERT INTO tasks ("title", "description", "done") VALUES (?, ?, ?)')
            .run(req.body.title, req.body.description ?? "", req.body.done ?? 0);

        res.status(201).json(data);
    }
    catch (err)
    {
        if (err instanceof Database.SqliteError && err.code === 'SQLITE_CONSTRAINT_NOTNULL')
        {
            res.status(400).json({ error: 'title is missing' });
        }
        else
        {
            res.status(500).json();
        }
    }
});

// toggle a todo state
app.patch("/:id", (req: Request, res: Response) =>
{
    try
    {
        const data = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);

        if (isTask(data))
        {
            db.prepare('UPDATE tasks SET done = ? WHERE id = ?').run(data.done === 0 ? 1 : 0, req.params.id);
            res.status(204).json();
        }
        else
        {
            res.status(404).json({ error: 'no task with this id' });
        }
    }
    catch (error)
    {
        res.status(500).json();
    }
});

app.listen(port, () =>
{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});