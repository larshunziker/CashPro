import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

let initialProps = {};

beforeAll(() => {
  initialProps = {
    locationOrigin: 'https://schweizer-illustrierte.ch',
  };
});

beforeEach(() => {
  initialProps = {
    ...initialProps,
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] RechtsratgeberLinkBox', () => {
  it.each([{ props: {} }, { props: null }, { props: [] }, { props: '' }])(
    'Should not render anything if invalid data is provided $#',
    (testCase) => {
      // @ts-ignore
      const { container } = render(<Component {...testCase.props} />);

      expect(container.innerHTML).toBe('');
    },
  );
  it('Should render correctly ', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(container.innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('rechtsratgeberlinkbox-title').innerHTML).toContain(
      mockData.linkBox.title,
    );
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('rechtsratgeberlinkbox-link-label-0').innerHTML,
    ).toContain(mockData.linkBox.links.edges[0].node.label);
  });
});
