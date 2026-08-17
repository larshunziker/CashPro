import { render } from '@testing-library/react';
import React from 'react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { DossierPropsInner } from '../index';

// @ts-ignore
let initialProps: DossierPropsInner = {};
let initialState = {};

beforeEach(() => {
  // @ts-ignore
  initialProps = {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    title: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    lead: null,
    headerImage: null,
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] OverviewPageHeader - Dossier', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render component correctly', () => {
    // @ts-ignore
    initialState.settings.activeMainChannel = 'SY';
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render component because no title is given', () => {
    // @ts-ignore
    initialState.settings.activeMainChannel = 'SY';
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render component because no image is given', () => {
    // @ts-ignore
    initialState.settings.activeMainChannel = 'SY';
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
