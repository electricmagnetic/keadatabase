import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Help link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Help/i);
  expect(linkElement).toBeInTheDocument();
});
