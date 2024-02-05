import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddTodo } from '../components/AddTodo';
import userEvent from '@testing-library/user-event';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUseNavigate,
}));

test('render a complete form', async () =>
{
    render(<AddTodo />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const input = screen.getByRole('input');
    expect(input).toBeInTheDocument();

    const textarea = screen.getByRole('textarea');
    expect(textarea).toBeInTheDocument();

    const button = screen.getByRole('submit');
    expect(button).toBeInTheDocument();

    userEvent.type(input, 'test input');
    expect(screen.getByRole('input')).toHaveValue('test input');


    const handleOnSubmitMock = jest.fn();
    form.onsubmit = handleOnSubmitMock;
    fireEvent.click(button);
    expect(handleOnSubmitMock).toHaveBeenCalled()
});

test('form input receive user text', async () =>
{
    render(<AddTodo />);

    const input = screen.getByRole('input');

    userEvent.type(input, 'test input');

    expect(screen.getByRole('input')).toHaveValue('test input');
});

test('submit function is called if title input not empty', async () =>
{
    render(<AddTodo />);

    const form = screen.getByRole('form');
    const input = screen.getByRole('input');
    const textarea = screen.getByRole('textarea');
    const button = screen.getByRole('submit');

    userEvent.type(input, 'todo title');
    userEvent.type(textarea, 'todo description');
    
    const handleOnSubmitMock = jest.fn();
    form.onsubmit = handleOnSubmitMock;

    fireEvent.click(button);

    expect(screen.getByRole('input')).not.toHaveValue('');
    expect(handleOnSubmitMock).toHaveBeenCalled();
});