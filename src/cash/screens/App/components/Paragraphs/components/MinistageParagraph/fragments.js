import { gql } from '@apollo/client';
import { ministageAccordionFragment } from './components/MinistageAccordion/fragments';
import { ministageLogoBoxFragment } from './components/MinistageLogoBox/fragments';
import { ministageTeaserFragment } from './components/MinistageTeaser/fragments';
import { ministageTrendingTopicsFragment } from './components/MinistageTrendingTopics/fragments';
import { ministageSingleAlertTopicFragment } from './components/MinistageSingleAlertTopic/fragments.js';

export const ministageNewsletterFragment = gql`
  fragment MinistageNewsletterFragment on MinistageNewsletter {
    headline
    lead
    image(style: "teaser_1_1") {
      id
      width
      height
      relativeOriginPath
      focalPointX
      focalPointY
    }
  }
`;

export const ministageParagraphFragment = gql`
  fragment MinistageParagraphFragment on MinistageParagraph {
    id
    anchorId
    ministage {
      ...MinistageTeaserFragment
      ...MinistageNewsletterFragment
      ...MinistageTrendingTopicsFragment
      ...MinistageAccordionFragment
      ...MinistageLogoBoxFragment
      ...MinistageSingleAlertTopicFragment
    }
  }

  ${ministageTeaserFragment}
  ${ministageNewsletterFragment}
  ${ministageTrendingTopicsFragment}
  ${ministageAccordionFragment}
  ${ministageLogoBoxFragment}
  ${ministageSingleAlertTopicFragment}
`;
