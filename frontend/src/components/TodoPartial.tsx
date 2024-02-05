import { Link, useNavigate } from "react-router-dom";
import { TTask } from "../types";
import { toggleTodoState } from "../data/mockedApi";
import { API } from "../constants/constants";

export function TodoPartial(props: { todo: TTask })
{
    const { title, done, id } = props.todo;

    const navigate = useNavigate();

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

    return <li className="list-group-item d-flex justify-content-between align-items-center" key={id}>
        <Link to={`${API}/${id}`}>
            <h2
                className={done === 1 ? "text-decoration-line-through"
                    : 'link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'}>
                {title}
            </h2>
        </Link>

        <div className="form-check">
            <input onChange={() => toggleState(id)} className="form-check-input" type="checkbox" value="" checked={!!done} />
        </div>
    </li>
}