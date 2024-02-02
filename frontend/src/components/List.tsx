import { useEffect, useState } from "react";
import { TTask } from "../types";
import { Task } from "./Task";
import { fakeTodos } from "../fake-todos";

export function List()
{
    const [todos, getTodos] = useState<TTask[]>([]);
    const API = 'http://0.0.0.0:8000';

    const fetchPost = () =>
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
        fetchPost()
    }, [])

    return <ul>
        {todos.map(todo => Task(todo))}
    </ul>
}