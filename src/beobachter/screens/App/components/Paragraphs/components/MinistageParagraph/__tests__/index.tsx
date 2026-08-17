import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import {
  MINISTAGE_COMPONENT_LISTICLE,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_TRENDING_TOPICS,
  MINISTAGE_COMPONENT_VIDEO,
  MINISTAGE_SEARCH,
} from '../../../../../../../../shared/constants/paragraphs';

jest.mock('../components/MinistageRechtsratgeber', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageListicle', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageNewsletter', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageTeaser', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageVideo', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageTrendingTopics', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageSingleAlertTopic', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/MinistageSearch', () => {
  return () => {
    return <div data-testid="ministage-search-component" />;
  };
});
jest.mock('../components/MinistageChatbot', () => {
  return () => {
    return <div data-testid="ministage-chatbot-component" />;
  };
});

const testIds = [
  'ministage-paragraph-guider-wrapper',
  'ministage-paragraph-listicle-wrapper',
  'ministage-paragraph-newsletter-wrapper',
  'ministage-paragraph-teaser-wrapper',
  'ministage-paragraph-video-wrapper',
  'ministage-paragraph-trending-topics-wrapper',
  'ministage-paragraph-single-alert-topic-wrapper',
  'ministage-paragraph-search-wrapper',
];

const initialProps = {
  ministageParagraph: {
    ministage: {
      __typename: '',
    },
  },
};

describe('[Paragraphs] MinistageParagraph', () => {
  it('Should render nothing if there are no passed props', () => {
    const { queryByTestId } = render(<Component />);

    testIds.forEach((id) => {
      expect(queryByTestId(id)).toBeNull();
    });
  });

  test.each([
    {
      typename: MINISTAGE_COMPONENT_LISTICLE,
      id: 'ministage-paragraph-listicle-wrapper',
    },
    {
      typename: MINISTAGE_COMPONENT_NEWSLETTER,
      id: 'ministage-paragraph-newsletter-wrapper',
    },
    {
      typename: MINISTAGE_COMPONENT_TEASER,
      id: 'ministage-paragraph-teaser-wrapper',
    },
    {
      typename: MINISTAGE_COMPONENT_VIDEO,
      id: 'ministage-paragraph-video-wrapper',
    },
    {
      typename: MINISTAGE_COMPONENT_TRENDING_TOPICS,
      id: 'ministage-paragraph-trending-topics-wrapper',
    },
    {
      typename: MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
      id: 'ministage-paragraph-single-alert-topic-wrapper',
    },
    {
      typename: '__non_existing_typename',
      id: 'ministage-paragraph-nonexistingtypename-wrapper',
    },
  ])(
    'Should render properly component with correct type of ministage',
    (item) => {
      initialProps.ministageParagraph.ministage.__typename = item.typename;

      const { queryByTestId } = render(<Component {...initialProps} />);

      testIds.forEach((id) => {
        if (id === item.id) {
          expect(queryByTestId(id)).not.toBeNull();
        } else {
          expect(queryByTestId(id)).toBeNull();
        }
      });
    },
  );

  it('Should render MinistageChatbot when searchTypeValue is chatbot', () => {
    const props = {
      ministageParagraph: {
        ministage: {
          __typename: MINISTAGE_SEARCH,
          searchTypeValue: 'chatbot',
        },
      },
    };

    const { queryByTestId } = render(<Component {...props} />);

    expect(queryByTestId('ministage-paragraph-search-wrapper')).not.toBeNull();
    expect(queryByTestId('ministage-chatbot-component')).not.toBeNull();
    expect(queryByTestId('ministage-search-component')).toBeNull();
  });

  it('Should render MinistageSearch for non-chatbot searchTypeValue', () => {
    const props = {
      ministageParagraph: {
        ministage: {
          __typename: MINISTAGE_SEARCH,
          searchTypeValue: 'site-search',
        },
      },
    };

    const { queryByTestId } = render(<Component {...props} />);

    expect(queryByTestId('ministage-paragraph-search-wrapper')).not.toBeNull();
    expect(queryByTestId('ministage-search-component')).not.toBeNull();
    expect(queryByTestId('ministage-chatbot-component')).toBeNull();
  });
});
