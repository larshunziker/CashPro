import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

jest.mock('../components/ParagraphsRenderer');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    pageBody: [],
  };
});

describe('[Component] Paragraphs', () => {
  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render the paragraphs wrapper, if pageBody is not empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pageBody = ['test-1', 'test-2']; // sample data. The array needs to be of length 1 or bigger

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />,
      </ReduxProvider>,
    );
    expect(queryByTestId('paragraphs-wrapper')).not.toBeNull();
  });
});
