import { TTask } from "../types";

export function Task(props: TTask)
{
    const { title, done, id } = props;

    return <li className="list-group-item" key={id}>
            <h2 className={ done === 1 ? "text-decoration-line-through" : ''}>{title}</h2>
        </li>
}