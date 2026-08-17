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

// TeaserM that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserM/components/TeaserMDefault', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserM/components/TeaserMBrandReport', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserM/components/TeaserMDossier', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserM/components/TeaserMLandingPage', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserM/components/TeaserMOpinion', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserM/components/TeaserMSpecial', () => {
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

describe('[TeaserM] TeaserM', () => {
  it('should render TeaserM-Special if channeltype is special', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.channel = { channelType: 'special' };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.__typename = LANDING_PAGE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('teaserM-special-wrapper')).not.toBeNull();
  });

  test.each`
    id                               | subtypeValue                       | sponsor                                     | typename
    ${'teaserM-brandreport-wrapper'} | ${''}                              | ${''}                                       | ${ADVERTISING_TYPE_BRANDREPORT}
    ${'teaserM-opinion-wrapper'}     | ${''}                              | ${''}                                       | ${ARTICLE_TYPE_OPINION}
    ${'teaserM-dossier-wrapper'}     | ${''}                              | ${''}                                       | ${DOSSIER_CONTENT_TYPE}
    ${'teaserM-special-wrapper'}     | ${''}                              | ${''}                                       | ${TEASER_LAYOUT_SPECIAL}
    ${'teaserM-landingpage-wrapper'} | ${''}                              | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaserM-landingpage-wrapper'} | ${'opinion'}                       | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaserM-default-wrapper'}     | ${''}                              | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaserM-default-wrapper'}     | ${''}                              | ${''}                                       | ${''}
    ${'teaserM-explaining-wrapper'}  | ${EXPLAINING_ARTICLE_CONTENT_TYPE} | ${''}                                       | ${''}
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
