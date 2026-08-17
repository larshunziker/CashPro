import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withApolloScreenHandlerFactory from '../../../shared/decorators/withApolloScreenHandlerFactory';
import { setScreenReady } from '../actions/route';
import {
  resetActiveContentType,
  resetActiveMainChannel,
  setActiveContentType,
  setActiveMainChannel,
} from '../actions/settings';
import {
  MAIN_CHANNEL_DEFAULT,
  MAIN_CHANNEL_HOME,
  ROUTE_HOME,
} from '../../screens/App/constants';
import { ActiveContentType, ActiveMainChannel } from '../types';

type QueryComponentProps = {
  environment: Route & {
    routeByPath: Route;
  };
};

type WithApolloScreenHandlerProps = {
  setActiveMainChannel: (activeMainChannel: ActiveMainChannel) => void;
  resetActiveMainChannel: () => void;
  setActiveContentType: (activeContentType: ActiveContentType) => void;
  resetActiveContentType: () => void;
  loading?: boolean;
  error?: string;
  data: QueryComponentProps;
};

// check on changes also the configureServerStore for activeMainchannel handling
const updateMainChannel = (props: WithApolloScreenHandlerProps) => {
  // TODO: type this correct when we got the correct route interface by BE
  const routeObject: any = props?.data?.environment?.routeByPath?.object;

  let mainChannel =
    routeObject?.channel?.settings?.mainChannel?.title ||
    routeObject?.settings?.mainChannel?.title ||
    MAIN_CHANNEL_DEFAULT;

  if (props?.data?.environment?.routeByPath?.preferred === `/${ROUTE_HOME}`) {
    mainChannel = MAIN_CHANNEL_HOME;
  }

  if (mainChannel && props.setActiveMainChannel) {
    props.setActiveMainChannel(mainChannel);
  } else if (props && props.resetActiveMainChannel) {
    props.resetActiveMainChannel();
  }
};

const updateContentType = (props: WithApolloScreenHandlerProps) => {
  // TODO: type this correct when we got the correct route interface by BE
  const routeObject: any = props?.data?.environment?.routeByPath?.object;

  if (routeObject?.__typename) {
    props.setActiveContentType(routeObject.__typename);
  } else {
    props.resetActiveContentType();
  }
};

const mapDispatchToProps = {
  setActiveMainChannel,
  resetActiveMainChannel,
  setActiveContentType,
  resetActiveContentType,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
const withUpdatedMainChannelAndContentType = (Component) => (props: any) => {
  updateMainChannel(props);
  updateContentType(props);
  return <Component {...props} />;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (Component) =>
  compose<any, any>(
    connect(null, mapDispatchToProps),
    withUpdatedMainChannelAndContentType,
    withApolloScreenHandlerFactory({ setScreenReady }),
  )(Component);
