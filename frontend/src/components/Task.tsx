import { TTask } from "../types";

export function Task(props: TTask)
{
    const { title, done, id } = props;

    if (done === 0)
    {
        return <li key={id}>
            <h2>{title}</h2>
        </li>
    }
    else
    {
        return <li key={id}>
            <h2 className="text-decoration-line-through">{title}</h2>
        </li>
    }

}