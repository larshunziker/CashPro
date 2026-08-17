import React from 'react';
import { render } from '@testing-library/react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import headerAdZoneFactory from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const NO_ADS = 'no-ads';

const routeInitialState: LocationState = {
  locationBeforeTransitions: {
    pathname: '/home',
    search: '',
    hash: '',
    action: 'PUSH',
    key: 'b86ozif',
    query: {},
  },
  screenReady: true,
  vertical: 'home',
};
const initialProps: any = {};
const initialState: any = {
  route: routeInitialState,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getMonsterSkyByProps = (props) => {
  if (props.routeVertical === NO_ADS) {
    return null;
  }
  return <span>monstersky</span>;
};
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getLeaderBoardByProps = (props) => {
  if (props.routeVertical === NO_ADS) {
    return null;
  }
  return <span>leaderboard</span>;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routeVertical: state.route.vertical as String,
});

beforeAll(() => {
  Component = connect(mapStateToProps)(
    headerAdZoneFactory({
      /* @ts-ignore TODO: TS2322 ->  Type '(props */
      MonsterSky: getMonsterSkyByProps,
      /* @ts-ignore TODO: TS2322 ->  Type '(props */
      LeaderBoard: getLeaderBoardByProps,
    }),
  );
});

describe('[Component] HeaderAdZone factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should return LeaderBoard and MonsterSky', async () => {
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render no ADs (because of NO_ADS route-vertical)', async () => {
    initialState.route.vertical = NO_ADS;

    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
