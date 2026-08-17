import { render } from '@testing-library/react';
import React from 'react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

describe('[Paragraphs] MinistageChannelSponsor', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;
  const initialState = {};

  beforeEach(() => {
    initialProps = {
      items: [
        {
          title: 'Test title',
          subtitle: 'Test subtitle',
          sponsors: [
            {
              name: 'Test sponsor',
              logoUrl: '/some-url',
              link: 'https://google.com',
            },
          ],
        },
      ],
    };
  });

  it('Should render nothing if there are no passed props', () => {
    initialProps = {};
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2741 ->  Property 'items' is missing in type '{}' but required in type '{ ref? */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render with infobox-container if the correct props are passed', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('wrapper').innerHTML).not.toBe('');
  });
});
