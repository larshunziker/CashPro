/**
 * @file   with page pager
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-04-01
 *
 */

/* istanbul ignore file */

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import namedComponent from './namedComponent';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './withMapQueryStringToProps'. '/Users/bhs/code/work/rasch-stack/src/share */
import withMapQueryStringToProps from './withMapQueryStringToProps';
import withNavigate from './withNavigate';
import withParams from './withParams';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'newPage' implicitly has an 'any' type. */
const doUpdatePage = (props, newPage) => {
  const query = {
    ...props.location.query,
    page: newPage,
  };

  // remove page query string if page is 1
  if (newPage < 2) {
    delete query.page;
  }

  props.navigate({
    pathname: props.location.pathname,
    query,
  });
};

const withPagerHandlers = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'newPage' implicitly has an 'any' type. */
  updatePage: (props) => (newPage) => {
    doUpdatePage(props, newPage);
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (Component) =>
  compose<any, any>(
    namedComponent('withPagePager'),
    withNavigate,
    withParams,
    withMapQueryStringToProps({
      name: 'page',
      initialValue: 1,
      parseInt: true,
    }),
    withPagerHandlers,
  )(Component);
