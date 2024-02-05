import { createBrowserRouter } from "react-router-dom";
import { List } from "../components/List";
import ErrorPage from "../components/ErrorPage";
import { TodoComplete } from "../components/TodoComplete";
import { getAllTodos, getTodoById } from "../data/mockedApi";
import { AddTodo } from "../components/AddTodo";

export const Router = createBrowserRouter([
    {
        path: "/todolist",
        element: <List />,
        loader: getAllTodos,
        errorElement: <ErrorPage />
    },
    {
        path: "/todolist/:id",
        element: <TodoComplete />,
        loader: getTodoById,
        errorElement: <ErrorPage />
    },
    {
        path: "/todolist/add-todo",
        element: <AddTodo />,
        errorElement: <ErrorPage />
    },
    {
        path: "/todolist/error",
        element: <ErrorPage />,
    }
]);