import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import SSRContextProvider from '../../../../../../SSRContext';

jest.mock('Link');
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

const componentFactoryOptions = {
  styles: {
    ContentWrapper: 'ContentWrapperClassName',
    Title: 'TitleClassName',
    SubTitle: 'SubTitleClassName',
    ItemWrapper: 'ItemWrapperClassName',
  },
  Teaser: () => <div>Mock Teaser</div>,
  isShuffleEnabled: true,
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] MinistageLogoBox', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should not render if ministageparagraph is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph = null;
    const { container } = render(
      <SSRContextProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </SSRContextProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { container } = render(
      <SSRContextProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </SSRContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
