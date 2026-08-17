import { gql } from '@apollo/client';
import { ministageAccordionFragment } from './components/MinistageAccordion/fragments';
import { ministageListicleFragment } from './components/MinistageListicle/fragments';
import { ministageNewsletterFragment } from './components/MinistageNewsletter/fragments';
import { ministageSingleAlertTopicFragment } from './components/MinistageSingleAlertTopic/fragments';
import { ministageSocialMediaFragment } from './components/MinistageSocialMedia/fragments';
import { ministageTeaserFragment } from './components/MinistageTeaser/fragments';
import { ministageTrendingTopicsFragment } from './components/MinistageTrendingTopics/fragments';
import { ministageVideoFragment } from './components/MinistageVideo/fragments';

export const ministageParagraphFragment = gql`
  fragment MinistageParagraphFragment on MinistageParagraph {
    id
    anchorId
    ministage {
      ...MinistageTeaserFragment
      ...MinistageNewsletterFragment
      ...MinistageSocialMediaFragment
      ...MinistageVideoFragment
      ...MinistageAccordionFragment
      ...MinistageTrendingTopicsFragment
      ...MinistageSingleAlertTopicFragment
      ...MinistageListicleFragment
    }
  }

  ${ministageTeaserFragment}
  ${ministageNewsletterFragment}
  ${ministageSocialMediaFragment}
  ${ministageVideoFragment}
  ${ministageSingleAlertTopicFragment}
  ${ministageAccordionFragment}
  ${ministageListicleFragment}
  ${ministageTrendingTopicsFragment}
`;
