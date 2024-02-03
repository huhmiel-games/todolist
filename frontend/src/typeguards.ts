import { TTask } from "./types";

export function isTodo(task: unknown | undefined): task is TTask
{
    return typeof task === "object" && task !== null && "title" in task;
}

export function isTodoList(todos: unknown | undefined): todos is TTask[]
{
    return Array.isArray(todos) && typeof todos[0] === "object"  && todos[0] !== null && "title" in todos[0]
}