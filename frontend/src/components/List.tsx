import { useEffect, useState } from "react";
import { TTask } from "../types";
import { Task } from "./Task";
import { fakeTodos } from "../fake-todos";
import { API } from "../constants";

export function List()
{
    const [todos, getTodos] = useState<TTask[]>([]);

    const fetchTodos = () =>
    {
        fetch(API)
            .then((res) => res.json())
            .then((res) =>
            {
                getTodos(res);
            })
            .catch(()=>{
                getTodos(fakeTodos);
            })
    }

    useEffect(() =>
    {
        fetchTodos()
    }, [])

    return <ul className="list-group">
        {todos.map(todo => Task({todo, fetchTodos}))}
    </ul>
}