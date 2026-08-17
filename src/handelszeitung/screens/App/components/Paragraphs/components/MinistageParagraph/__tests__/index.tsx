import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import {
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_COMPONENT_LISTICLE,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
  MINISTAGE_COMPONENT_SOCIAL_MEDIA,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_TRENDING_TOPICS,
  MINISTAGE_COMPONENT_VIDEO,
} from '../../../../../../../../shared/constants/paragraphs';

const initialState = {};

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
  'Paragraphs/components/MinistageParagraph/components/MinistageAccordion',
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
jest.mock(
  'Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic',
  () => {
    return () => {
      return null;
    };
  },
);

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
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test('Should render nothing if there is no ministage in the ministage paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test('Should render nothing if there is no ministage typename', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage.__typename;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test.each`
    id                                                  | typename
    ${'ministage-paragraph-socialmedia-wrapper'}        | ${MINISTAGE_COMPONENT_SOCIAL_MEDIA}
    ${'ministage-paragraph-newsletter-wrapper'}         | ${MINISTAGE_COMPONENT_NEWSLETTER}
    ${'ministage-paragraph-accordion-wrapper'}          | ${MINISTAGE_COMPONENT_ACCORDION}
    ${'ministage-paragraph-teaser-wrapper'}             | ${MINISTAGE_COMPONENT_TEASER}
    ${'ministage-paragraph-video-wrapper'}              | ${MINISTAGE_COMPONENT_VIDEO}
    ${'ministage-paragraph-single-alert-topic-wrapper'} | ${MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC}
    ${'ministage-paragraph-trending-topics-wrapper'}    | ${MINISTAGE_COMPONENT_TRENDING_TOPICS}
    ${'ministage-paragraph-listicle-wrapper'}           | ${MINISTAGE_COMPONENT_LISTICLE}
  `('Should render $typename properly', ({ id, typename }) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.__typename = typename;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId(id)).not.toBeNull();
  });
});
