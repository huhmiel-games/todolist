import { rest } from "msw";
import { API } from "../constants/constants";

const mockedTodos = [
    { id: 2, title: "second task", description: "with description", done: 0 },
    { id: 1, title: "first task", description: "", done: 0 }
];

export const handlers = [
    rest.get(`${API}`, (req, res, ctx) =>
    {
        return res(ctx.status(200), ctx.json(mockedTodos));
    }),

    rest.get(`${API}/:id`, (req, res, ctx) =>
    {
        const todo = mockedTodos.find(elm => elm.id === +req.params.id);

        return res(ctx.status(200), ctx.json(todo));
    }),

    rest.patch(`${API}/:id`, (req, res, ctx) =>
    {
        const todoIndex = mockedTodos.findIndex(elm => elm.id === +req.params.id);

        if (todoIndex !== -1)
        {
            const state = mockedTodos[todoIndex].done;

            mockedTodos[todoIndex].done = state === 0 ? 1 : 0;

            mockedTodos.sort((a, b) =>
            {
                if (a.done < b.done) return -1;
                if (a.done > b.done) return 1;

                if (a.id < b.id) return 1;
                if (a.id > b.id) return -1;

                return 0;
            });

            return res(ctx.status(204))
        }
    }),

    rest.post(`${API}`, async (req, res, ctx) =>
    {
        const body = await req.json();

        const newTodo = {
            id: mockedTodos.length + 1,
            title: body.title,
            description: body.description ?? '',
            done: 0
        };

        mockedTodos.unshift(newTodo);

        return res(ctx.status(201));
    }),
];