import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import specialFactory from '../factory';
import { routeInitialState } from '../../../../../../beobachter/shared/reducers/route';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockOptions from './mockdata.json';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const Link = ({ children }) => <div>{children}</div>;
const button = <div />;
const initialState = { window: windowInitialState, route: routeInitialState };

/* @ts-ignore TODO: TS7034 ->  Variable 'mockOptionsCopy' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockOptionsCopy;

beforeEach(() => {
  mockOptionsCopy = JSON.parse(JSON.stringify(mockOptions));
  mockOptionsCopy.button = button;
  mockOptionsCopy.Link = Link;
});

describe('[Common] Teaser - Special factory', () => {
  it('Should render factory without a anchor tag because no preferredUri is given.', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */
    mockOptionsCopy.preferredUri = null;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */}
        {specialFactory(mockOptionsCopy)}
      </ReduxProvider>,
    );

    expect(queryByTestId('teaser-factory-image-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).not.toBeNull();
  });

  it('Should render factory correctly', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */}
          {specialFactory(mockOptionsCopy)}
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(queryByTestId('teaser-factory-image-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-factory-short-title-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).not.toBeNull();
  });

  it('Should render factory without image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */
    mockOptionsCopy.teaserImage.image.file.relativeOriginPath = null;
    const { queryByTestId } = render(
      <MemoryRouter>
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */}
          {specialFactory(mockOptionsCopy)}
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(queryByTestId('teaser-factory-image-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).not.toBeNull();
  });

  it('Should render factory without short title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */
    mockOptionsCopy.shortTitle = null;
    const { queryByTestId } = render(
      <MemoryRouter>
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'mockOptionsCopy' implicitly has an 'any' type. */}
          {specialFactory(mockOptionsCopy)}
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(queryByTestId('teaser-factory-short-title-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-image-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).not.toBeNull();
  });
});
