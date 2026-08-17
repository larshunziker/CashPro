/**
 * @author  Remo Vetere (remo.vetere@ringieraxelspringer.ch)
 * @date    2017-08-25
 *
 */
/* istanbul ignore file */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import namedComponent from 'decorators/namedComponent';

const languageFlowHOC = (options) => (Component) => (props) => {
  if (__SERVER__) {
    checkLanguage(props, options);
  }

  useEffect(() => {
    checkLanguage(props, options);
  });

  return <Component chooseLanguage={props.chooseLanguage} {...props} />;
};

// ---------------------------------------------------------------------------------- //
// HELPERS
// ---------------------------------------------------------------------------------- //

const parseCookiesClient = () => {
  if (!document.cookie) {
    return {};
  }

  return parseCookieString(document.cookie);
};

const parseCookiesServer = (request) => {
  if (!request || !request.headers || !request.headers.cookie) {
    return {};
  }

  return parseCookieString(request.headers.cookie);
};

const parseCookieString = (cookieString) => {
  const list = {};

  cookieString.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
};

const getBrowserLanguage = () => {
  if (__CLIENT__) {
    return navigator.languages || [];
  }

  // return global.request.acceptsLanguages();
  return null; // GM-794: we never want to redirect on SSR anymore! so we don't need to read acceptedLangs anymore
};

const languageSupported = (languages) => {
  const acceptedLanguages = getBrowserLanguage();

  if (acceptedLanguages) {
    for (let j = 0, len2 = acceptedLanguages.length; j < len2; j += 1) {
      const acceptedLanguage = acceptedLanguages[j];
      for (let i = 0, len = languages.length; i < len; i += 1) {
        const language = languages[i];
        const regEx = new RegExp(language);

        if (acceptedLanguage.match(regEx)) {
          return acceptedLanguage;
        }
      }
    }
  }

  return null;
};

const getRawLanguage = (inputLanguage) =>
  inputLanguage.length === 2 ? inputLanguage : inputLanguage.substring(0, 2);

const checkLanguage = (props, options) => {
  const cookies = __CLIENT__
    ? parseCookiesClient()
    : parseCookiesServer(global.request);

  if (props.vertical === options.routes.home) {
    // we are on HOME - de -> start with the language flow-chart!
    let language = 'de';

    // does language cookie exist?
    if (cookies.gmLanguage) {
      language = cookies.gmLanguage;
    } else {
      // user's browser lang is one of: de, de-*, fr or fr-* ?
      const supportedLanguage = languageSupported(['^de(.*)', '^fr(.*)']);
      if (supportedLanguage !== null) {
        language = getRawLanguage(supportedLanguage);
      }

      // else -> redirect to home - de (this is already the case here -> do nothing)
    }

    if (language !== 'de') {
      if (
        __CLIENT__ &&
        __PRODUCTION__ &&
        global.location.pathname !== `/${language}`
      ) {
        global.location.pathname = `/${language}`;
      } else {
        // see in entry/server/index.js for this special handling
        // GM-794: we never want to redirect on SSR anymore!
        // global.redirectNext = `/${language}`;
      }
    }
  } else if (
    props.vertical === options.routes.homeFr &&
    !cookies.gmLanguage &&
    __CLIENT__
  ) {
    props.chooseLanguage(props.language);
  }
};

export const doChooseLanguage = (props, language, options) => {
  const date = new Date();
  date.setTime(date.getTime() + 14 * 24 * 60 * 60 * 1000);

  const expires = `expires=${date.toGMTString()}`;
  const cookieStr = `gmLanguage=${language};${expires};`;

  if (__CLIENT__) {
    if (navigator.cookieEnabled) {
      document.cookie = cookieStr;
    }

    if (props.language !== language) {
      // redirect to the corresponding home url, for the chosen language
      global.location.pathname =
        language === options.defaultLanguage ? '' : `/${language}`;
    }
  }
};

const mapStateToProps = (options) => (state) => ({
  language: options.settingsStateSelector(state).language,
  vertical: options.locationStateSelector(state).vertical,
});

const extendWithHandlers = (options) =>
  withHandlers({
    chooseLanguage: (props) => (language) =>
      doChooseLanguage(props, language, options),
  });

export default (options) => (Component) =>
  compose(
    namedComponent('languageFlow'),
    connect(mapStateToProps(options)),
    extendWithHandlers(options),
    languageFlowHOC(options),
  )(Component);
