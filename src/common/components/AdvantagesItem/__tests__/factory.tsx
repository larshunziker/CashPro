import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import advantagesItemFactory from '../factory';
import { routeInitialState } from '../../../../beobachter/shared/reducers/route';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const initialState = {
  route: {
    ...routeInitialState,
    clientUrl: 'https://develop.publication.ch',
  },
};

const factoryOptions = {
  styles: {
    Icon: 'Iconstyle',
    Text: 'Textstyle',
    Wrapper: 'Wrapperstyle',
  },
};

const AdvantagesItem = advantagesItemFactory(factoryOptions);
const Component = (props: any) => {
  return (
    <ReduxProvider initialState={initialState}>
      <AdvantagesItem {...props} />
    </ReduxProvider>
  );
};

beforeEach(() => {
  initialProps = { item: JSON.parse(JSON.stringify(mockData)) };
});

describe('[Common] AdvantagesItem', () => {
  it('Should render correctly if full item is passed in', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('advantages-item-wrapper')).not.toBeNull();
    expect(queryByTestId('image-wrapper')).not.toBeNull();
    expect(queryByTestId('text-wrapper')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render empty if item is null', () => {
    const { container, queryByTestId } = render(<Component item={''} />);
    expect(queryByTestId('advantages-item-wrapper')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render without image/icon if image lacks source', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.item.image.source = null;
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('image-wrapper')).toBeNull();
  });

  it('Should render without text if text lacks text', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.item.text = null;
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('text-wrapper')).toBeNull();
  });
});
