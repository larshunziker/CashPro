import React from 'react';
import { render } from '@testing-library/react';
import advantageItemFactory from '../../../../AdvantagesItem/factory';
import advantagesParagraphFactory from '../factory';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

jest.mock('Link');
const AdvantagesItem = advantageItemFactory({
  styles: {
    Icon: 'Iconstyle',
    Text: 'Textstyle',
    Wrapper: 'Wrapperstyle',
  },
});

Component = advantagesParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ ...props } */
  AdvantagesItem,
  styles: {
    Title: 'TitleStyle',
    Wrapper: 'WrapperStyle',
    OuterWrapper: 'OuterWrapperStyle',
    ItemWrapper: 'ItemWrapperStyle',
  },
});

const ItemWrapperFunctionComponent = advantagesParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ ...props } */
  AdvantagesItem,
  styles: {
    Title: 'TitleStyle',
    Wrapper: 'WrapperStyle',
    OuterWrapper: 'OuterWrapperStyle',
    ItemWrapper: () => 'DifferentItemWrapperStyle',
  },
});

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Common] AdvantagesParagraph', () => {
  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('title')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without header if it is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entry.header = '';
    const { container, queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('title')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should return null if no/empty Items array is passed', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entry.advantagesItems = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('wrapper')).toBeNull();

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entry.advantageItems = null;
    const { queryByTestId: nullQueryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(nullQueryByTestId('wrapper')).toBeNull();
  });

  it('Should call itemWrapper if it is a function', () => {
    const { container, getAllByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <ItemWrapperFunctionComponent {...initialProps} />
      </ReduxProvider>,
    );

    getAllByTestId('item-wrapper').forEach((element) => {
      // @ts-ignore
      expect(element).toHaveClass('DifferentItemWrapperStyle');
    });

    expect(container).toMatchSnapshot();
  });
});
