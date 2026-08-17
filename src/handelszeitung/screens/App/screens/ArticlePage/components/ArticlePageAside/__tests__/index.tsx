import React from 'react';
import Component from '../index';
import { render } from '../../../../../../../shared/customRenderer';
import mockData from './mockData.json';
jest.mock('../../../../../components/EditorialPicks');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = mockData;
});

describe('[Component] ArticlePageAside', () => {
  it('Should render correctly', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
