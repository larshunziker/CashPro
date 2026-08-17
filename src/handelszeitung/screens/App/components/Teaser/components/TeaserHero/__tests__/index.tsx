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

// TeaserHero that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserHero/components/TeaserHeroDefault', () => {
  return () => {
    return null;
  };
});
jest.mock(
  'Teaser/components/TeaserHero/components/TeaserHeroBrandreport',
  () => {
    return () => {
      return null;
    };
  },
);
jest.mock('Teaser/components/TeaserHero/components/TeaserHeroDossier', () => {
  return () => {
    return null;
  };
});
jest.mock(
  'Teaser/components/TeaserHero/components/TeaserHeroLandingPage',
  () => {
    return () => {
      return null;
    };
  },
);
jest.mock('Teaser/components/TeaserHero/components/TeaserHeroOpinion', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserHero/components/TeaserHeroSpecial', () => {
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

describe('[Teaser-Hero] Teaser-Hero Special', () => {
  it('should render TeaserHero-Special if channeltype is special', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.channel = { channelType: 'special' };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.__typename = LANDING_PAGE_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('teaser-hero-special-wrapper')).not.toBeNull();
  });

  test.each`
    id                                   | subtypeValue | sponsor                                     | typename
    ${'teaser-hero-brandreport-wrapper'} | ${''}        | ${''}                                       | ${ADVERTISING_TYPE_BRANDREPORT}
    ${'teaser-hero-opinion-wrapper'}     | ${''}        | ${''}                                       | ${ARTICLE_TYPE_OPINION}
    ${'teaser-hero-dossier-wrapper'}     | ${''}        | ${''}                                       | ${DOSSIER_CONTENT_TYPE}
    ${'teaser-hero-special-wrapper'}     | ${''}        | ${''}                                       | ${TEASER_LAYOUT_SPECIAL}
    ${'teaser-hero-landingpage-wrapper'} | ${''}        | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaser-hero-landingpage-wrapper'} | ${'opinion'} | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaser-hero-defualt-wrapper'}     | ${''}        | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaser-hero-defualt-wrapper'}     | ${''}        | ${''}                                       | ${''}
  `(
    'Should render $typename properly',
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
