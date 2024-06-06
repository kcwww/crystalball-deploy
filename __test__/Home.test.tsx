import Home from '@/app/(landing)/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('HOME', () => {
  it('renders a heading', () => {
    render(<Home />);
    const heading = screen.getByText('SBIM START');

    expect(heading).toBeInTheDocument();
  });
});
