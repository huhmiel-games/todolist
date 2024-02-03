import { createBrowserRouter } from "react-router-dom";
import { List } from "../components/List";
import ErrorPage from "../components/ErrorPage";
import { TodoComplete } from "../components/TodoComplete";
import { getAllTodos, getTodoById } from "../data/fetchApi";

export const Router = createBrowserRouter([
    {
      path: "/",
      element: <List />,
      loader: getAllTodos,
      errorElement: <ErrorPage />
    },
    {
      path: "/:id",
      element: <TodoComplete />,
      loader: getTodoById,
      errorElement: <ErrorPage />
    },
    {
      path: "/error",
      element: <ErrorPage />,
    }
  ]);