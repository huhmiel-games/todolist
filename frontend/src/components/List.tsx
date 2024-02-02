import { useEffect, useState } from "react";

export function List()
{
    const [todos, getTodos] = useState([]);
    const API = 'http://0.0.0.0:8000';

    const fetchPost = () =>
    {
        fetch(API)
            .then((res) => res.json())
            .then((res) =>
            {
                console.log(res)
                getTodos(res)
            })
    }

    useEffect(() =>
    {
        fetchPost()
    }, [])

    return <ul></ul>
}