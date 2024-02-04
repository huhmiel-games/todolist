import { Link } from "react-router-dom";

export function AddTodoButton()
{
    return (
        <Link to='/add-todo'>
            <button className="position-absolute top-0 end-0 m-2 btn btn-primary rounded-circle shadow-sm">&#10010;</button>
        </Link>
    )
}