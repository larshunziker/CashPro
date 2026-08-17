import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Component from '../index';
import mockData from './mockData.json';

let initialProps: any = {};

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] MinistageRechtsratgeber', () => {
  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('ministage-rechtsratgeber-wrapper')).not.toBeNull();

    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[0].node.label,
    );
    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[0].node.path,
    );
    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[1].node.label,
    );
    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[1].node.path,
    );
    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[2].node.label,
    );
    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[2].node.path,
    );
  });

  it('Should not render if no data is passed', () => {
    initialProps.ministageGuider = {};
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('ministage-rechtsratgeber-wrapper')).toBeNull();
  });

  it('Should only render links, if there is valid data', () => {
    initialProps.ministageGuider.links.edges[0] = null;
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    expect(queryByTestId('ministage-rechtsratgeber-wrapper')).not.toBeNull();
    expect(container.innerHTML).not.toContain(
      mockData.ministageGuider.links.edges[0].node.label,
    );
    expect(container.innerHTML).toContain(
      mockData.ministageGuider.links.edges[1].node.label,
    );
  });
});
