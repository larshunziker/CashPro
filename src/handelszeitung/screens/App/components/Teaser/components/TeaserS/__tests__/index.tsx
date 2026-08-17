import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
  DOSSIER_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_LANDINGPAGE,
  TEASER_LAYOUT_SPECIAL,
} from '../../../../../../../../shared/constants/teaser';

// TeaserS that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserS/components/TeaserSDefault', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserS/components/TeaserSBrandReport', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserS/components/TeaserSDossier', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserS/components/TeaserSLandingPage', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserS/components/TeaserSOpinion', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserS/components/TeaserSSpecial', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserExplaining', () => {
  return () => {
    return null;
  };
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    __typename: '',
    subtypeValue: '',
    sponsor: '',
    channel: '',
  };
});

describe('[TeaserS] TeaserS', () => {
  it('should render TeaserS-Special if channeltype is special', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.channel = { channelType: 'special' };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.__typename = LANDING_PAGE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('teaserS-special-wrapper')).not.toBeNull();
  });

  test.each`
    id                               | subtypeValue                       | sponsor                                     | typename
    ${'teaserS-brandReport-wrapper'} | ${''}                              | ${''}                                       | ${ADVERTISING_TYPE_BRANDREPORT}
    ${'teaserS-opinion-wrapper'}     | ${''}                              | ${''}                                       | ${ARTICLE_TYPE_OPINION}
    ${'teaserS-dossier-wrapper'}     | ${''}                              | ${''}                                       | ${DOSSIER_CONTENT_TYPE}
    ${'teaserS-special-wrapper'}     | ${''}                              | ${''}                                       | ${TEASER_LAYOUT_SPECIAL}
    ${'teaserS-landingpage-wrapper'} | ${''}                              | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaserS-landingpage-wrapper'} | ${'opinion'}                       | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaserS-default-wrapper'}     | ${''}                              | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaserS-default-wrapper'}     | ${''}                              | ${''}                                       | ${''}
    ${'teaserS-explaining-wrapper'}  | ${EXPLAINING_ARTICLE_CONTENT_TYPE} | ${''}                                       | ${''}
  `(
    `Should render $typename properly`,
    ({ id, subtypeValue, sponsor, typename }) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.__typename = typename;
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.subtypeValue = subtypeValue;
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.sponsor = sponsor;
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      const { queryByTestId } = render(<Component {...initialProps} />);
      expect(queryByTestId(id)).not.toBeNull();
    },
  );
});
