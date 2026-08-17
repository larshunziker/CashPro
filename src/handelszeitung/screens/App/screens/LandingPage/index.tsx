import React from 'react';
import { HOME } from '../../../../shared/actions/route';
import LandingPageDefault from './components/LandingPageDefault';
import LandingPageHome from './components/LandingPageHome';
import LandingPageOtherPublications from './components/LandingPageOtherPublications';
import LandingPageSpecial from './components/LandingPageSpecial';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../shared/constants/publications';
import {
  LANDING_PAGE_TITLE_SPECIAL,
  TEASER_LAYOUT_IS_SPECIAL,
} from './constants';
import { LandingPageProps } from './typings';

type LandingPagePropsInner = LandingPageProps;

const LandingPage = ({
  origin,
  landingPage,
  page,
  location,
  isAdSuppressed,
}: LandingPagePropsInner) => {
  let vertical = (location?.pathname === '/' && HOME) || '';
  const pathname = global?.location?.pathname || '';

  // we do have the same conditions for the route reduxState in https://github.com/rasch-dtc/rasch-stack/blob/develop/src/handelszeitung/shared/configureStore.js#L110
  // but this doesn't work well with the history back
  if (pathname === '/') {
    vertical = HOME;
  }

  if (vertical === HOME) {
    return (
      <LandingPageHome
        landingPage={landingPage}
        page={page}
        location={location}
        origin={origin}
        isAdSuppressed={isAdSuppressed}
      />
    );
  }

  if (
    landingPage?.publication === PUBLICATION_SWISS_INSURANCE ||
    landingPage?.publication === PUBLICATION_BIL ||
    landingPage?.publication === PUBLICATION_HZB
  ) {
    return (
      <LandingPageOtherPublications
        landingPage={landingPage}
        page={page}
        location={location}
        origin={origin}
      />
    );
  }

  if (
    landingPage?.channel?.channelType === TEASER_LAYOUT_IS_SPECIAL &&
    landingPage?.channel?.title !== LANDING_PAGE_TITLE_SPECIAL
  ) {
    return (
      <LandingPageSpecial
        landingPage={landingPage}
        page={page}
        location={location}
      />
    );
  }
  return (
    <LandingPageDefault
      landingPage={landingPage}
      page={page}
      location={location}
    />
  );
};

export default LandingPage;
