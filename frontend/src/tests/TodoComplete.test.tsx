import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "./renderWithRouter";
import { TodoComplete } from "../components/TodoComplete";

test('TodoComplete render one todo with the description', async () =>
{
    renderWithRouter({
        element: <TodoComplete />,
        path: "/2",
        loader: () =>
        {
            return {
                id: 2,
                title: "second task",
                description: "with description",
                done: 0
            }
        }
    });

    await waitFor(() =>
    {
        expect(screen.getByText(/second task/i)).toBeInTheDocument();
        expect(screen.getByText(/with description/i)).toBeInTheDocument();
    });

});

test('TodoComplete render one todo without description', async () =>
{
    renderWithRouter({
        element: <TodoComplete />,
        path: "/2",
        loader: () =>
        {
            return {
                id: 2,
                title: "second task",
                done: 0
            }
        }
    });

    await waitFor(() =>
    {
        expect(screen.getByText(/second task/i)).toBeInTheDocument();
    });
});