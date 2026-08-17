import React from 'react';
import { render } from '@testing-library/react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../index'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App/ */
import Component from '../index';
import {
  MINISTAGE_COMPONENT_DISRUPTOR,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_VIDEO,
} from '../../../../../../../../shared/constants/paragraphs';

// Ministages that are connected to a redux state are mocked
jest.mock(
  'Paragraphs/components/MinistageParagraph/components/MinistageNewsletter',
  () => {
    return () => {
      return null;
    };
  },
);
jest.mock(
  'Paragraphs/components/MinistageParagraph/components/MinistageTeaser',
  () => {
    return () => {
      return null;
    };
  },
);

jest.mock('../components/MinistageDisruptor', () => {
  return () => {
    return null;
  };
});

jest.mock('../components/MinistageVideo', () => {
  return () => {
    return null;
  };
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ministageParagraph: {
      ministage: {
        __typename: '',
      },
    },
  };
});

describe('[Paragraphs] MinistageParagraph', () => {
  test('Should render nothing if there are no passed props', () => {
    const { container } = render(<Component />);
    expect(container.innerHTML).toBe('');
  });

  test('Should render nothing if there is no ministage in the ministage paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  test('Should render nothing if there is no ministage typename', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage.__typename;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  test.each`
    id                                          | typename
    ${'ministage-paragraph-disruptor-wrapper'}  | ${MINISTAGE_COMPONENT_DISRUPTOR}
    ${'ministage-paragraph-newsletter-wrapper'} | ${MINISTAGE_COMPONENT_NEWSLETTER}
    ${'ministage-paragraph-teaser-wrapper'}     | ${MINISTAGE_COMPONENT_TEASER}
    ${'ministage-paragraph-video-wrapper'}      | ${MINISTAGE_COMPONENT_VIDEO}
  `('Should render $typename properly', ({ id, typename }) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.__typename = typename;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId(id)).not.toBeNull();
  });
});
