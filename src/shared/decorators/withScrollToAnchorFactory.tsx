import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import namedComponent from './namedComponent';

// ---------------------------------------------------------------------------------- //
// HOC
// ---------------------------------------------------------------------------------- //

type Config = {
  hash?: string;
  offset?: number;
};

const defaultConfig: Config = {
  hash: 'page',
  offset: 50,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'scope' implicitly has an 'any' type. */
const scrollToAnchor = (config: Config) => (scope) => {
  if (
    !scope.props.locationState.screenReady ||
    !scope.props.locationState.locationBeforeTransitions ||
    !scope.props.locationState.locationBeforeTransitions.hash ||
    scope.props.locationState.locationBeforeTransitions.hash !==
      `#${config.hash}`
  ) {
    return;
  }

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const el = document.getElementById(config.hash);

  if (!el) {
    return;
  }

  const boundingClientRect = el.getBoundingClientRect();

  if (!boundingClientRect || !boundingClientRect.top) {
    return;
  }

  const top =
    (window.pageYOffset || document.documentElement?.scrollTop || 0) -
    (document.documentElement?.clientTop || 0);

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const newPosition = top + boundingClientRect.top - config.offset;

  if (newPosition > 0) {
    global.scrollTo(0, newPosition);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'factoryOptions' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (factoryOptions) => (state) => ({
  locationState: factoryOptions.selectLocationState(state),
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'factoryOptions' implicitly has an 'any' type. */
export const withStoreConnection = (factoryOptions) =>
  connect(mapStateToProps(factoryOptions));

export const withLifecycle = (config: Config) =>
  lifecycle<any, any>({
    componentDidMount() {
      scrollToAnchor(config)(this);
    },
    componentDidUpdate() {
      scrollToAnchor(config)(this);
    },
  });

/* @ts-ignore TODO: TS7006 ->  Parameter 'factoryOptions' implicitly has an 'any' type. */
export default (factoryOptions) =>
  (config: Config = defaultConfig) =>
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
  (Component) =>
    (__CLIENT__ &&
      compose<any, any>(
        namedComponent('withScrollToAnchor'),
        withStoreConnection(factoryOptions),
        withLifecycle({ ...defaultConfig, ...config }),
      )(Component)) ||
    Component;
