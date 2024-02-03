import { TodoPartial } from "./TodoPartial";
import { useLoaderData } from "react-router-dom";
import { isTodoList } from "../typeguards";

export function List()
{
    const todos = useLoaderData();

    if(todos && isTodoList(todos))
    {
        return (
            <div className="m-2">
                <ul className="list-group">
                    {todos.map(todo => TodoPartial({ todo }))}
                </ul>
            </div>
        )
    }
    else
    {
        return <></>
    }
}