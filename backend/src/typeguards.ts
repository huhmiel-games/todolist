import { Task } from "./types";

export function isTask(task: unknown | undefined): task is Task
{
    return typeof task === "object" && task !== null && "title" in task;
}