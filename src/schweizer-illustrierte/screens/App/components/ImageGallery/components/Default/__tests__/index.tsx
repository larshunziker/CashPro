import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));

  initialState = {
    window: windowInitialState,
    settings: settingsInitialState,
  };
});

describe('[Component] ImageGallery - Default', () => {
  it('Should not render image gallery (empty gallery prop)', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component />
      </ReduxProvider>,
    );

    expect(queryByTestId('imagegallery-container')).toBeNull();
  });

  it('Should not render image gallery (empty settings state and empty gallery prop)', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component />
      </ReduxProvider>,
    );

    expect(queryByTestId('imagegallery-container')).toBeNull();
  });

  it('Should render image gallery', () => {
    const { queryAllByTestId, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryAllByTestId('imagegallery-container')).toHaveLength(1);
    expect(queryByTestId('imagegallery-container')).not.toBeNull();

    expect(queryAllByTestId('imagegallery-short-title')).toHaveLength(1);
    expect(queryByTestId('imagegallery-short-title')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('imagegallery-short-title')).toHaveTextContent(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.gallery.shortTitle,
    );

    expect(queryAllByTestId('imagegallery-title')).toHaveLength(1);
    expect(queryByTestId('imagegallery-title')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('imagegallery-title')).toHaveTextContent(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.gallery.title,
    );
  });

  it('Should render image gallery without title bar when hasTitleOverride is true and title is null', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.hasTitleOverride = true;

    const { queryAllByTestId, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryAllByTestId('imagegallery-container')).toHaveLength(1);
    expect(queryByTestId('imagegallery-container')).not.toBeNull();

    expect(queryByTestId('imagegallery-short-title')).toBeNull();
    expect(queryByTestId('imagegallery-title')).toBeNull();
  });

  it('Should render image gallery without short title when hasTitleOverride is true and title is not null', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.hasTitleOverride = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.title = 'the new awesome title';

    const { queryAllByTestId, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryAllByTestId('imagegallery-container')).toHaveLength(1);
    expect(queryByTestId('imagegallery-container')).not.toBeNull();

    expect(queryByTestId('imagegallery-short-title')).toBeNull();
    expect(queryByTestId('imagegallery-title')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('imagegallery-title')).toHaveTextContent(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.title,
    );
  });
});
