import React from 'react';
import { render } from '@testing-library/react';
import { VIEWPORT_MD } from '../../../../../../shared/actions/window';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import {
  LOGO_ABO_BADGE,
  LOGO_BIL,
  LOGO_HZ,
  LOGO_HZ_CLAIM,
  LOGO_HZ_INSURANCE,
} from '../constants';

const initialState = {
  window: {
    height: 500,
    scrollTop: 0,
    viewport: {
      label: 'viewport/xs',
      from: 0,
      to: 759,
    },
    width: 320,
  },
};
const initialProps: any = {};

describe('[Component] Logo', () => {
  it.each([
    [
      {
        props: {},
      },
    ],
    [
      {
        props: {
          type: LOGO_BIL,
          isInline: true,
        },
      },
    ],
    [
      {
        props: {
          type: LOGO_ABO_BADGE,
          isInline: true,
        },
      },
    ],
    [
      {
        props: {
          type: LOGO_ABO_BADGE,
        },
      },
    ],
    [
      {
        props: {
          type: LOGO_HZ,
        },
      },
    ],
    [
      {
        props: {
          type: LOGO_HZ_INSURANCE,
        },
      },
    ],
  ])('Should match snapshot with given props %#', (testCase) => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...testCase.props} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HZ Claim logo correctly on mobile', () => {
    initialProps.type = LOGO_HZ_CLAIM;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HZ Claim logo correctly on desktop', () => {
    initialState.window.viewport.label = VIEWPORT_MD;
    initialProps.type = LOGO_HZ_CLAIM;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
