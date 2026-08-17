import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import locationStateSelector from '../selectors/locationStateSelector';
import { log } from '../helpers/utils';
// ---------------------------------------------------------------------------------- //
// HOC
// ---------------------------------------------------------------------------------- //

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
const withUpdatePolicy = shouldUpdate<any>((props, nextProps): boolean => {
  const shouldUpdate: boolean =
    nextProps && nextProps.locationState && nextProps.locationState.screenReady;
  if (shouldUpdate) {
    log('with-wait-until-apollo-loaded', 'screen is ready', 'green');
  } else {
    log(
      'with-wait-until-apollo-loaded',
      'screen is not ready - abort update',
      'orange',
    );
  }
  return shouldUpdate;
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  locationState: locationStateSelector(state),
});

export const withStoreConnection = connect(mapStateToProps);

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (Component) =>
  compose<any, any>(withStoreConnection, withUpdatePolicy)(Component);
