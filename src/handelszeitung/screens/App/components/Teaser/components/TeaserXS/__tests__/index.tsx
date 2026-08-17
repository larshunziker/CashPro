import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_OPINION,
  DOSSIER_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_LANDINGPAGE,
  TEASER_LAYOUT_SPECIAL,
} from '../../../../../../../../shared/constants/teaser';

// TeaserXS that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserXS/components/TeaserXSDefault', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserXS/components/TeaserXSBrandReport', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserXS/components/TeaserXSDossier', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserXS/components/TeaserXSLandingPage', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserXS/components/TeaserXSOpinion', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserXS/components/TeaserXSSpecial', () => {
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

describe('[TeaserXS] TeaserXS', () => {
  it('should render TeaserXS-Special if channeltype is special', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.channel = { channelType: 'special' };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.__typename = LANDING_PAGE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('teaserXS-special-wrapper')).not.toBeNull();
  });

  test.each`
    id                                | subtypeValue | sponsor                                     | typename
    ${'teaserXS-brandReport-wrapper'} | ${''}        | ${''}                                       | ${ADVERTISING_TYPE_BRANDREPORT}
    ${'teaserXS-opinion-wrapper'}     | ${''}        | ${''}                                       | ${ARTICLE_TYPE_OPINION}
    ${'teaserXS-dossier-wrapper'}     | ${''}        | ${''}                                       | ${DOSSIER_CONTENT_TYPE}
    ${'teaserXS-special-wrapper'}     | ${''}        | ${''}                                       | ${TEASER_LAYOUT_SPECIAL}
    ${'teaserXS-landingpage-wrapper'} | ${''}        | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaserXS-landingpage-wrapper'} | ${'opinion'} | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaserXS-default-wrapper'}     | ${''}        | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaserXS-default-wrapper'}     | ${''}        | ${''}                                       | ${''}
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
