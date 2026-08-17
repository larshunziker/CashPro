import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from '../../../../../../Teaser/__tests__/mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
const mockSponsor = {
  sponsor: {
    teaserImage: {
      id: 'cGFyYWdyYXBoOmltYWdlOmhhbmRlbHN6ZWl0dW5nX2ZhbGxiYWNrOm5ldy1qVUpGdk1kYQ==',
      image: {
        id: '613628',
        file: {
          id: 'ZmlsZTo2MTU1MTE6OjE2MDAsMTIwMDpsYXJnZTo=',
          alt: 'Handelszeitung Logo',
          relativeOriginPath: '/2021-10/handelszeitung_fallback.png',
          focalPointX: 1600,
          focalPointY: 1200,
          __typename: 'ImageFile',
        },
        __typename: 'Image',
      },
      __typename: 'ImageParagraph',
    },
  },
};
beforeEach(() => {
  initialProps = {
    node: mockData.node,
  };
  initialState = {};
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

describe('[Component] Teaser - TeaserMBrandReport', () => {
  it('Should render correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps.node} {...mockSponsor} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
