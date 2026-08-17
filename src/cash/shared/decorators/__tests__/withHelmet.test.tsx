import React from 'react';
import { Provider, connect } from 'react-redux';
import { AnyAction, createStore } from 'redux';
import { act, render } from '@testing-library/react';
import { mapStateToProps } from '../../../../shared/decorators/withHelmetFactory';
import { getPublisherLogoDimensions } from '../withHelmet';

describe('CASH withHelmet', () => {
  it('does not rerender the wrapped page after an unrelated state update', () => {
    const initialState = {
      route: { clientUrl: '/aktien/ubs-group-n-24476758/swx/chf' },
      scroll: { scrollTop: 0 },
    };
    const store = createStore(
      (state: typeof initialState = initialState, action: AnyAction) => {
        if (action.type === 'scroll/scroll-top') {
          return {
            ...state,
            scroll: action.payload,
          };
        }

        return state;
      },
    );
    const Page = jest.fn(() => <div>Fullquote page</div>);
    const ConnectedPage = connect(
      mapStateToProps({ getPublisherLogoDimensions } as any),
    )(Page);

    render(
      <Provider store={store}>
        <ConnectedPage />
      </Provider>,
    );
    expect(Page).toHaveBeenCalledTimes(1);

    act(() => {
      store.dispatch({
        type: 'scroll/scroll-top',
        payload: { scrollTop: 100 },
      });
    });

    expect(Page).toHaveBeenCalledTimes(1);
  });
});
