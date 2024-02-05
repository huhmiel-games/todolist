import { LoaderFunctionArgs } from "react-router-dom";
import { TTask } from "../types";

export async function getAllTodos()
{
    return loadTodos();
}

export async function getTodoById(args: LoaderFunctionArgs<any>)
{
    if (!args.params.id)
    {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }

    const id = +args.params.id;

    const localTodos = loadTodos();

    const todo = localTodos.find(elm => elm.id === id);

    if (todo)
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
    const localTodos = loadTodos();

    const todoIndex = localTodos.findIndex(elm => elm.id === id);


    if (todoIndex !== -1)
    {
        const state = localTodos[todoIndex].done;

        localTodos[todoIndex].done = state === 0 ? 1 : 0;

        localTodos.sort((a, b) =>
        {
            if (a.done < b.done) return -1;
            if (a.done > b.done) return 1;
            
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;

            return 0;
        })

        saveTodos(localTodos);

        return 204;
    }
    else
    {
        return 500
    }
}

export async function addTodo(title: string, description: string | undefined)
{
    const todos: TTask[] = loadTodos();

    const newTodo: TTask = {
        id: todos.length + 1,
        title,
        description,
        done: 0
    };

    todos.unshift(newTodo);

    saveTodos(todos);

    return 201;
}

function loadTodos(): TTask[]
{
    const localTodos = localStorage.getItem('todos');

    if (localTodos)
    {
        return JSON.parse(localTodos);
    }
    else
    {
        const mockedTodos: TTask[] = [
            { id: 2, title: "second task", description: "with description", done: 0 },
            { id: 1, title: "first task", description: "", done: 0 }
        ];

        saveTodos(mockedTodos);

        return mockedTodos;
    }
}

function saveTodos(todos: TTask[])
{
    localStorage.setItem('todos', JSON.stringify(todos))
}