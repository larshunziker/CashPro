import compose from 'recompose/compose';
import withState from 'recompose/withState';
import namedComponent from '../../../../../shared/decorators/namedComponent';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (Component) =>
  compose<any, any>(
    namedComponent('withPagerState'),
    withState<Object, number, string, string>('page', 'setPage', 1),
  )(Component);
