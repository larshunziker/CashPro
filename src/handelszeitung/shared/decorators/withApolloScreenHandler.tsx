import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import withApolloScreenHandlerFactory from '../../../shared/decorators/withApolloScreenHandlerFactory';
import { setActivePublication } from '../../../shared/actions/navigation';
import { setScreenReady } from '../actions/route';
import { PUBLICATION_HZ } from '../../../shared/constants/publications';

const mapDispatchToProps = {
  setActivePublication,
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'setActivePublication' implicitly has an 'any' type. */
const updatePublication = ({ data, setActivePublication }) => {
  const routeObject =
    data?.environment?.routeByPath?.object || data?.routeByPath || null;
  const publication = routeObject?.publication || PUBLICATION_HZ;

  if (publication && setActivePublication) {
    setActivePublication(publication);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const withUpdatedActivePublication = (Component) => (props) => {
  updatePublication(props);
  return <Component {...props} />;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (Component) =>
  compose<any, any>(
    connect(null, mapDispatchToProps),
    withUpdatedActivePublication,
    withApolloScreenHandlerFactory({ setScreenReady }),
  )(Component);
