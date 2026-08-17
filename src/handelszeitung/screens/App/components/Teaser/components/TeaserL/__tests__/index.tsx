import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SEATCHANGE,
  DOSSIER_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_LANDINGPAGE,
  TEASER_LAYOUT_SPECIAL,
} from '../../../../../../../../shared/constants/teaser';

// TeaserL that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserL/components/TeaserLDefault', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserL/components/TeaserLBrandreport', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserL/components/TeaserLDossier', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserL/components/TeaserLLandingPage', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserL/components/TeaserLOpinion', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserL/components/TeaserLSpecial', () => {
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

describe('[TeaserL] TeaserL', () => {
  it('should render TeaserL-Special if channeltype is special', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.channel = { channelType: 'special' };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.__typename = LANDING_PAGE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('teaserL-special-wrapper')).not.toBeNull();
  });

  test.each`
    id                               | subtypeValue                       | sponsor                                     | typename
    ${'teaserL-brandreport-wrapper'} | ${''}                              | ${''}                                       | ${ADVERTISING_TYPE_BRANDREPORT}
    ${'teaserL-opinion-wrapper'}     | ${''}                              | ${''}                                       | ${ARTICLE_TYPE_OPINION}
    ${'teaserL-dossier-wrapper'}     | ${''}                              | ${''}                                       | ${DOSSIER_CONTENT_TYPE}
    ${'teaserL-special-wrapper'}     | ${''}                              | ${''}                                       | ${TEASER_LAYOUT_SPECIAL}
    ${'teaserL-landingpage-wrapper'} | ${''}                              | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaserL-landingpage-wrapper'} | ${'opinion'}                       | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaserL-default-wrapper'}     | ${''}                              | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaserL-default-wrapper'}     | ${''}                              | ${''}                                       | ${''}
    ${'teaserL-default-wrapper'}     | ${ARTICLE_TYPE_SEATCHANGE}         | ${''}                                       | ${''}
    ${'teaserL-explaining-wrapper'}  | ${EXPLAINING_ARTICLE_CONTENT_TYPE} | ${''}                                       | ${''}
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
