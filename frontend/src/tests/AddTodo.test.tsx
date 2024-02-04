import { render, screen } from '@testing-library/react';
import { AddTodo } from '../components/AddTodo';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUseNavigate,
}));

test('render form', async () =>
{
    render(<AddTodo />);

    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const input = screen.getByRole('input');
    expect(input).toBeInTheDocument();

    const textarea = screen.getByRole('textarea');
    expect(textarea).toBeInTheDocument();

    const button = screen.getByRole('submit');
    expect(button).toBeInTheDocument();
});