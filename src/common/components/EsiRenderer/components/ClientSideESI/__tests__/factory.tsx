import React from 'react';
import { render, waitFor } from '@testing-library/react';
import componentFactory from '../factory';
import { routeInitialState } from '../../../../../../cash/shared/reducers/route';
import { authInitialState } from '../../../../../../shared/reducers/auth';
import ReduxProvider from '../../../../../../cash/shared/tests/components/ReduxProvider';

let initialState = {};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
beforeEach(() => {
  initialState = {
    route: routeInitialState,
    auth: authInitialState,
  };
  jest.clearAllMocks();
  Component = componentFactory();
});

describe('[Component] ComponentName', () => {
  it('Should render html and append script tag', async () => {
    const html = `<div>hello</div><link ref="https://rasch-fi-staging.cash.ch/core/modules/system/css/components/tabledrag.module.css"></link><script>console.log("hi")</script>`;

    jest.spyOn(document.body, 'appendChild');
    jest.spyOn(document.body, 'removeChild');

    const { container, unmount } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component html={html} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe(
      '<div class="esi_client"><div>hello</div><link ref="https://rasch-fi-staging.cash.ch/core/modules/system/css/components/tabledrag.module.css"></div>',
    );

    // 1x dangerouslySetInnerHTML and 1x appendChild(scriptElement)
    expect(document.body.appendChild).toHaveBeenCalledTimes(2);

    expect(document.body.removeChild).toHaveBeenCalledTimes(0);
    unmount();

    await waitFor(() => {
      // remove script tag from DOM
      expect(document.body.removeChild).toHaveBeenCalledTimes(1);
    });
  });

  it('Should render html without script tag', () => {
    const html = `<div>hello</div><link ref="https://rasch-fi-staging.cash.ch/core/modules/system/css/components/tabledrag.module.css"></link>`;

    jest.spyOn(document.body, 'appendChild');

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component html={html} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe(
      '<div class="esi_client"><div>hello</div><link ref="https://rasch-fi-staging.cash.ch/core/modules/system/css/components/tabledrag.module.css"></div>',
    );

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  });

  it('Should render null if there is no html prop', () => {
    const html = ``;

    jest.spyOn(document.body, 'appendChild');

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component html={html} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });
});
