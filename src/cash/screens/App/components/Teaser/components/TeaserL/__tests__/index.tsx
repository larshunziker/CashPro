import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import { LANDING_PAGE_CONTENT_TYPE } from '../../../../../../../../shared/constants/content';
import { TEASER_LAYOUT_LANDINGPAGE } from '../../../../../../../../shared/constants/teaser';

// TeaserL that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserL/components/TeaserLDefault', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserL/components/TeaserLLandingPage', () => {
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
  test.each`
    id                               | subtypeValue     | sponsor                                     | typename
    ${'teaserL-landingpage-wrapper'} | ${''}            | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaserL-landingpage-wrapper'} | ${'LandingPage'} | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaserL-default-wrapper'}     | ${''}            | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaserL-default-wrapper'}     | ${''}            | ${''}                                       | ${''}
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
