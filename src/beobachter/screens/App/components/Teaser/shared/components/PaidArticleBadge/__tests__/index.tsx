import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Component from '../index';
afterEach(cleanup);

describe('[Component] Teaser BE+ Icon', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component />);
    const teaserBadge = queryByTestId('paid-article-teaser-badge');

    expect(teaserBadge).toMatchSnapshot();
  });
});
