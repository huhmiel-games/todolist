import { useLoaderData, useNavigate } from "react-router-dom";
import { isTodo } from "../typeguards";
import { toggleTodoState } from "../data/fetchApi";

export function TodoComplete()
{
    const navigate = useNavigate();

    const todo = useLoaderData();

    const toggleState = async (id: number) =>
    {
        const statusCode = await toggleTodoState(id);

        if (statusCode === 204)
        {
            navigate("/");
        }
        else
        {
            navigate("/error");
        }
    }

    if (todo && isTodo(todo))
    {
        const { id, title, done, description } = todo;

        return (
            <div className="border rounded p-2 m-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className={done === 1 ? "text-decoration-line-through" : ''}>{title}</h2>
                    <div className="form-check">
                        <input onClick={() => toggleState(id)} className="form-check-input" type="checkbox" value="" checked={!!done} />
                    </div>
                </div>
                <p>{description}</p>
            </div>
        )
    }
    else
    {
        return <></>
    }
}