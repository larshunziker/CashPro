import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('LinkLegacy');
jest.mock('../../../../Navigation/components/LanguageSwitch');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = { settings: { language: 'de' } };
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] FooterInner', () => {
  it('Should render nothing', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Menu'. */}
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Menu'. */}
        <Component footerPrimaryMenu={null} footerPrimaryMenuFr={null} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render German menu when language is German', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render French menu when language is French', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.settings.language = 'fr';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render subtree items without label', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.footerPrimaryMenuFr.links.edges[0].node.link.label = '';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
