import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

describe('App test', () => {

  it('renders App elements', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(screen.getByTestId('appNav')).toBeInTheDocument();
  });
});
