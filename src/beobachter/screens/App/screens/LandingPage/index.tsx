import React from 'react';
import compose from 'recompose/compose';
import withHeaderProps, {
  WithHeaderProps,
} from '../../../../shared/decorators/withHeaderProps';
import { HOME } from '../../../../shared/actions/route';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import LandingPageDefault from './components/LandingPageDefault';
import LandingPageHome from './components/LandingPageHome';
import LandingPageLinkList, {
  LANDINGPAGE_TYPE_LINKS,
} from './components/LandingPageLinkList';
import { LandingPageProps } from './typings';

type LandingPagePropsInner = LandingPageProps & WithHeaderProps;

const LandingPage = (props: LandingPagePropsInner) => {
  let vertical = (props.location?.pathname === '/' && HOME) || '';

  const pathname = (!__TESTING__ && global?.location?.pathname) || ''; // does not work with testing config

  // we do have the same conditions for the route reduxState in https://github.com/rasch-dtc/rasch-stack/blob/develop/src/handelszeitung/shared/configureStore.js#L110
  // but this doesn't work well with the history back
  if (pathname === '/') {
    vertical = HOME;
  }

  if (vertical === HOME) {
    return (
      <TestFragment data-testid="landingpage-home">
        <LandingPageHome
          landingPage={props.landingPage}
          origin={props.origin}
          location={props.location}
        />
      </TestFragment>
    );
  }

  if (props?.landingPage?.landingPageType === LANDINGPAGE_TYPE_LINKS) {
    return (
      <TestFragment data-testid="landingpage-linklist-wrapper">
        <LandingPageLinkList
          landingPage={props.landingPage}
          page={props.page}
          updatePage={props.updatePage}
          location={props.location}
        />
      </TestFragment>
    );
  }

  return (
    <TestFragment data-testid="landingpage-default-wrapper">
      <LandingPageDefault
        landingPage={props.landingPage}
        page={props.page}
        updatePage={props.updatePage}
        location={props.location}
      />
    </TestFragment>
  );
};

export default compose<any, any>(withHeaderProps)(LandingPage);
