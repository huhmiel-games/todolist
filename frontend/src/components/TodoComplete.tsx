import { useLoaderData, useNavigate } from "react-router-dom";
import { toggleTodoState } from "../data/mockedApi";
import { TTask } from "../types";
import { API } from "../constants/constants";

export function TodoComplete()
{
    const navigate = useNavigate();

    const todo = useLoaderData() as TTask;

    const toggleState = async (id: number) =>
    {
        const statusCode = await toggleTodoState(id);

        if (statusCode === 204)
        {
            navigate('/todolist');
        }
        else
        {
            navigate('/todolist/error');
        }
    }

    const { id, title, done, description } = todo;

    return (
        <div className="border rounded p-2 m-2">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className={done === 1 ? "text-decoration-line-through" : ''}>{title}</h2>
                <div className="form-check">
                    <input onChange={() => toggleState(id)} className="form-check-input" type="checkbox" value="" checked={!!done} />
                </div>
            </div>
            <p>{description}</p>
        </div>
    )
}