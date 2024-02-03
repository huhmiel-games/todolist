import { LoaderFunctionArgs } from "react-router-dom";
import { API } from "../constants/constants";

export async function getAllTodos()
{
    const todos = await fetch(API);

    if (todos.status === 200)
    {
        return todos;
    }
    else
    {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
}

export async function getTodoById(args: LoaderFunctionArgs<any>)
{
    const todo = await fetch(`${API}/${args.params.id}`);

    if (todo.status === 200)
    {
        return todo;
    }
    else
    {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
}

export async function toggleTodoState(id: number)
{
    return fetch(`${API}/${id}`, { method: "PATCH" })
        .then((res) =>
        {
            return res.status;
        })
        .catch(() =>
        {
            return 500;
        })
}