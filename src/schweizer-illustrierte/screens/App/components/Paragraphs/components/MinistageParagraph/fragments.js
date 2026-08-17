import { gql } from '@apollo/client';
import { horoscopeStageParagraphFragment } from 'Paragraphs/components/MinistageParagraph/components/HoroscopeStageParagraph/fragments';
import { ministageAccordionFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageAccordion/fragments';
import { ministageSingleAlertTopicFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic/fragments';
import { ministageTrendingTopicsFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/fragments';
import { ministageVideoFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageVideo/fragments';

export const ministageFragment = gql`
  fragment MinistageParagraphFragment on MinistageParagraph {
    id
    anchorId
    ministage {
      ...HoroscopeStageParagraphFragment
      ...MinistageVideoFragment
      ...MinistageTrendingTopicsFragment
      ...MinistageSingleAlertTopicFragment
      ...MinistageAccordionFragment
    }
  }

  ${horoscopeStageParagraphFragment}
  ${ministageAccordionFragment}
  ${ministageVideoFragment}
  ${ministageTrendingTopicsFragment}
  ${ministageSingleAlertTopicFragment}
`;
