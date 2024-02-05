import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

test('renders TODO LIST', () =>
{
    render(<Header />);
    const title = screen.getByText(/TODO LIST/i);
    expect(title).toBeInTheDocument();
});