import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router
import { fireEvent, render, screen } from '@testing-library/react';
import useRaschRouterLocation from '../../../../../../../../shared/hooks/useRaschRouterLocation';
import SearchFilters from '../index';

// Mocking the useRaschRouterLocation hook
jest.mock('../../../../../../../../shared/hooks/useRaschRouterLocation');
let facets: { name: string; count: number }[] = [];
describe('SearchFilters', () => {
  beforeEach(() => {
    (useRaschRouterLocation as jest.Mock).mockReturnValue({
      pathname: '/test',
      query: { filter: 'all' },
      params: { query: 'testQuery' },
    });
    facets = [];
  });

  test('renders SearchFilters component', () => {
    render(
      <Router>
        <SearchFilters facets={facets} />
      </Router>,
    );
    expect(screen.getByTestId('search-filters')).toBeInTheDocument();
  });

  test('scrolls left when left button is clicked', () => {
    render(
      <Router>
        <SearchFilters facets={facets} />
      </Router>,
    );
    const leftButton = screen.getByTestId('button-prev');
    fireEvent.click(leftButton);
  });

  test('scrolls right when right button is clicked', () => {
    render(
      <Router>
        <SearchFilters facets={facets} />
      </Router>,
    );
    const rightButton = screen.getByTestId('button-next');
    fireEvent.click(rightButton);
  });
});
