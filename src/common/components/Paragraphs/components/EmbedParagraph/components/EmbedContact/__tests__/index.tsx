import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import Component from '../index';

const iFrame =
  '<iframe height="1px" title="CONTACT" src="https://kundenservice.ringieraxelspringer.ch/handelszeitung?hideHeader=true"></iframe>';

describe('[Screen] Contact', () => {
  test('Should render contact embed with iframe', async () => {
    const store = createStore((state) => state, {});
    const { queryByTestId } = render(
      <Provider store={store}>
        <Component code={iFrame} />
      </Provider>,
    );

    expect(queryByTestId('contact-form-iframe')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('contact-form-iframe').style.height === '1px');

    global.dispatchEvent(
      new CustomEvent('resize', { bubbles: true, detail: { height: 10 } }),
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('contact-form-iframe').style.height === '10');
  });

  test('Should render no contact embed', async () => {
    const store = createStore((state) => state, {});
    const { queryByTestId } = render(
      <Provider store={store}>
        <Component code="" />
      </Provider>,
    );

    expect(queryByTestId('contact-form-iframe')).toBeNull();
  });
});
