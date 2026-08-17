import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import { LANDING_PAGE_CONTENT_TYPE } from '../../../../../../../../shared/constants/content';
import { TEASER_LAYOUT_LANDINGPAGE } from '../../../../../../../../shared/constants/teaser';

// TeaserM that are connected to a redux state are mocked
jest.mock('Teaser/components/TeaserM/components/TeaserMDefault', () => {
  return () => {
    return null;
  };
});
jest.mock('Teaser/components/TeaserM/components/TeaserMLandingPage', () => {
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
  test.each`
    id                               | subtypeValue | sponsor                                     | typename
    ${'teaserM-landingpage-wrapper'} | ${''}        | ${''}                                       | ${TEASER_LAYOUT_LANDINGPAGE}
    ${'teaserM-landingpage-wrapper'} | ${'opinion'} | ${''}                                       | ${LANDING_PAGE_CONTENT_TYPE}
    ${'teaserM-default-wrapper'}     | ${''}        | ${{ sponsor: { title: 'I am a sponsor' } }} | ${''}
    ${'teaserM-default-wrapper'}     | ${''}        | ${''}                                       | ${''}
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
