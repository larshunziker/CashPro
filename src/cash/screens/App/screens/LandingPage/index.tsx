import React from 'react';
import { HOME } from '../../../../shared/actions/route';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import LandingPageDefault from './components/Default';
import DefaultWithPullout from './components/DefaultWithPullout';
import LandingPageHome from './components/Home';
import { ROUTE_HOME_HYBRID } from '../../constants';
import { LandingPageProps } from './typings';

type LandingPagePropsInner = LandingPageProps;

const LandingPage = ({
  origin,
  landingPage,
  page,
  location,
  isAdSuppressed,
}: LandingPagePropsInner) => {
  let vertical =
    (location?.pathname === '/' &&
      landingPage.preferredUri !== `/${ROUTE_HOME_HYBRID}` &&
      HOME) ||
    '';
  const pathname = global?.location?.pathname || '';
  const isOverviewPageWithGrid =
    Array.isArray(landingPage?.grid?.edges) &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    landingPage?.grid?.edges.length > 0;

  // we do have the same conditions for the route reduxState in https://github.com/rasch-dtc/rasch-stack/blob/develop/src/handelszeitung/shared/configureStore.js#L110
  // but this doesn't work well with the history back
  if (!__TESTING__) {
    if (
      pathname === '/' &&
      landingPage.preferredUri !== `/${ROUTE_HOME_HYBRID}`
    ) {
      vertical = HOME;
    }
  }

  if (vertical === HOME) {
    return (
      <TestFragment data-testid="landingpage-home">
        <LandingPageHome
          landingPage={landingPage}
          page={page}
          location={location}
          origin={origin}
          isAdSuppressed={isAdSuppressed}
        />
      </TestFragment>
    );
  }

  if (!isOverviewPageWithGrid) {
    return (
      <TestFragment data-testid="landingpage-pullout">
        <DefaultWithPullout
          landingPage={landingPage}
          page={page}
          location={location}
          origin={origin}
          isAdSuppressed={isAdSuppressed}
        />
      </TestFragment>
    );
  }

  return (
    <TestFragment data-testid="landingpage-default">
      <LandingPageDefault
        landingPage={landingPage}
        page={page}
        location={location}
      />
    </TestFragment>
  );
};

export default LandingPage;
