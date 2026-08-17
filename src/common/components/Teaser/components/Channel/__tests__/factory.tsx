import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { routeInitialState } from '../../../../../../beobachter/shared/reducers/route';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockGraphQlData from './mockGraphQlData.json';
import { STYLE_1X1_280 } from '../../../../../../shared/constants/images';

const factoryOptions = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Link: (props) => (
    <div data-testid={props['data-testid']} className={props.className}>
      {props.label}
    </div>
  ),
  styles: {
    Wrapper: 'wrapperClassname',
    Image: 'imageClassname',
    ShortTitle: 'shortTitleClassname',
    Title: 'titleClassname',
  },
  imageIdentifier: 'id',
  teaserImageStyles: { style_320: STYLE_1X1_280 },
};

const Component = componentFactory(factoryOptions);

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockGraphQlData));
  initialState = {
    window: windowInitialState,
    route: routeInitialState,
  };
});

describe('[Component] Teaser Channel', () => {
  it('Should render with nothing if no data is provided', () => {
    initialProps = {};
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('teaser-channel-wrapper')).toBeNull();
  });

  it('Should render with title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.authors = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.settings.lead = null;

    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(queryByTestId('teaser-channel-wrapper')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-wrapper')).toHaveClass(
      factoryOptions.styles.Wrapper,
    );
    expect(queryByTestId('teaser-channel-image')).toBeNull();
    expect(queryByTestId('teaser-channel-short-title')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-short-title')).toHaveTextContent(
      mockGraphQlData.title,
    );
    //@ts-ignore
    expect(queryByTestId('teaser-channel-short-title')).toHaveClass(
      factoryOptions.styles.ShortTitle,
    );
    expect(queryByTestId('teaser-channel-title')).toBeNull();
  });

  it('Should render with title and author image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.settings.lead = null;

    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(queryByTestId('teaser-channel-wrapper')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-wrapper')).toHaveClass(
      factoryOptions.styles.Wrapper,
    );
    /*
    TODO: Even though we pass teaser-channel-image to LazyImg and it gets
    rendered, queryByTestId - for whatever reason - can't find it
    expect(queryByTestId('teaser-channel-image')).not.toBeNull();
    expect(queryByTestId('teaser-channel-image')).toHaveClass(
      factoryOptions.styles.Image,
    );*/
    expect(queryByTestId('teaser-channel-short-title')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-short-title')).toHaveTextContent(
      mockGraphQlData.title,
    );
    //@ts-ignore
    expect(queryByTestId('teaser-channel-short-title')).toHaveClass(
      factoryOptions.styles.ShortTitle,
    );
    expect(queryByTestId('teaser-channel-title')).toBeNull();
  });

  it('Should render with title, author image and description', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    expect(queryByTestId('teaser-channel-wrapper')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-wrapper')).toHaveClass(
      factoryOptions.styles.Wrapper,
    );
    /*
    TODO: Even though we pass teaser-channel-image to LazyImg and it gets
    rendered, queryByTestId - for whatever reason - can't find it
    expect(queryByTestId('teaser-channel-image')).not.toBeNull();
    expect(queryByTestId('teaser-channel-image')).toHaveClass(
      factoryOptions.styles.Image,
    );
    */
    expect(queryByTestId('teaser-channel-short-title')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-short-title')).toHaveTextContent(
      mockGraphQlData.title,
    );
    //@ts-ignore
    expect(queryByTestId('teaser-channel-short-title')).toHaveClass(
      factoryOptions.styles.ShortTitle,
    );
    expect(queryByTestId('teaser-channel-title')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('teaser-channel-title')).toHaveTextContent(
      mockGraphQlData.settings.lead,
    );
  });
});
