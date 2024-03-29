import { TodoPartial } from "./TodoPartial";
import { useLoaderData } from "react-router-dom";
import { isTodoList } from "../typeguards";
import { AddTodoButton } from "./AddTodoButton";

export function List()
{
    const todos = useLoaderData();

    return (
        <>
            <AddTodoButton />
            <div className="m-2">
                <ul className="list-group">
                    {isTodoList(todos) && todos.map(todo => TodoPartial({ todo }))}
                </ul>
            </div>
        </>
    )
}