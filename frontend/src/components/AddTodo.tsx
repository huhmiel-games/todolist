import { FormEvent } from "react";
import { addTodo } from "../data/fetchApi";
import { useNavigate } from "react-router-dom";

export function AddTodo()
{
    const navigate = useNavigate();

    const submitTodo = async (event: FormEvent) =>
    {        
        event.preventDefault();
        
        const target = event.target as typeof event.target & {
            title: { value: string };
            description: { value: string };
        };

        const title = target.title.value;
        const description = target.description?.value || ''; 

        const statusCode = await addTodo(title, description);

        if (statusCode === 201)
        {
            navigate('/');
        }
    }

    return (
        <>
            <h2 className="m-2">Add a todo</h2>
            <form role="form" className="m-2" onSubmit={submitTodo}>
                <div className="mb-3">
                    <label htmlFor="title-input" className="form-label">Title</label>
                    <input role="input" type="text" className="form-control" name="title" id="title-input" placeholder="my todo title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description-input" className="form-label">add a description if you want</label>
                    <textarea role="textarea" className="form-control" id="description-input" name="description" rows={3}></textarea>
                </div>
                <div className="col-12">
                    <button role="submit" className="btn btn-primary" type="submit">Submit todo</button>
                </div>
            </form>
        </>
    )
}