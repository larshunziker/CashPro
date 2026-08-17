import React from 'react';
import { HOME, HOME_FR } from '../../../../shared/actions/route';
import LandingPageDefault from './components/LandingPageDefault';
import LandingPageHome from './components/LandingPageHome';
import { LandingPageProps } from './typings';

const LandingPage = (props: LandingPageProps) => {
  let vertical =
    (props.location.pathname === '/' && HOME) ||
    (props.location.pathname === '/fr' && HOME_FR) ||
    '';
  const pathname = global?.location?.pathname || '';

  // we do have the same conditions for the route reduxState in https://github.com/rasch-dtc/rasch-stack/blob/develop/src/gaultmillau/shared/configureStore.js#L98
  // but this doesn't work well with the history back
  if (pathname === '/') {
    vertical = HOME;
  }

  if (
    pathname === '/fr' ||
    pathname === '/fr/' ||
    pathname.startsWith('/fr?')
  ) {
    vertical = HOME_FR;
  }

  if (vertical === HOME || vertical === HOME_FR) {
    return <LandingPageHome {...props} />;
  }

  return <LandingPageDefault {...props} />;
};

export default LandingPage;
