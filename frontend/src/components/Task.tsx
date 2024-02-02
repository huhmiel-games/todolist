import { API } from "../constants";
import { TTask } from "../types";

export function Task(props: {todo:TTask, fetchTodos: Function})
{
    const { title, done, id } = props.todo;

    const toggleTask = () =>
    {
        fetch(`${API}/${id}`, { method: "PATCH" })
            .then((res) => {
                if (res.status === 204)
                {
                    props.fetchTodos();
                }
            })
            .catch(() =>
            {
                // todo handle error
            })
    }


    return <li className="list-group-item d-flex justify-content-between" key={id}>
        <h2 className={done === 1 ? "text-decoration-line-through" : ''}>{title}</h2>
        <button onClick={toggleTask} className="btn btn-primary">&#10003;</button>
    </li>
}