import { List } from "../components/List";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "./renderWithRouter";

test('List render all the todos with only titles', async () =>
{
    renderWithRouter({
        element: <List />,
        path: "/",
        loader: () => [
            { id: 2, title: "second task", description: "with description", done: 1 },
            { id: 1, title: "first task", description: "", done: 0 }
        ],
    });

    await waitFor(() =>
    {
        expect(screen.getByText(/first task/i)).toBeInTheDocument();
        expect(screen.getByText(/second task/i)).toBeInTheDocument();
        expect(screen.queryByText(/with description/i, {  })).not.toBeInTheDocument();

        const items = screen.getAllByRole("listitem");
        expect(items.length).toBe(2);
    });

});

test('Todo is crossed out if done', async () =>
{
    renderWithRouter({
        element: <List />,
        path: "/",
        loader: () => [
            { id: 1, title: "first task", description: "", done: 0 },
            { id: 2, title: "second task", description: "with description", done: 1 }
        ],
    });

    await waitFor(() =>
    {
        const headings = screen.getAllByRole("heading", { level: 2 });

        const firstItem = headings[0];
        expect(firstItem).not.toHaveClass("text-decoration-line-through");

        const secondItem = headings[1];
        expect(secondItem).toHaveClass("text-decoration-line-through");
    });
});

test('List render correctly if empty', async () =>
{
    renderWithRouter({
        element: <List />,
        path: "/",
        loader: () => [],
    });

    await waitFor(() =>
    {
        const list = screen.getByRole("list");
        expect(list).toBeEmptyDOMElement();
    });

});