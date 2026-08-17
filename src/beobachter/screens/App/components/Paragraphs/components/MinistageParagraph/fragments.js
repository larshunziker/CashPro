/**
 *
 */

import { gql } from '@apollo/client';
import { ministageGuiderFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageRechtsratgeber/fragments';
import { ministageListicleFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageListicle/fragments';
import { ministageNewsletterFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/fragments';
import { ministageAccordionFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageAccordion/fragments';
import { ministageVideoFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageVideo/fragments';
import { ministageTrendingTopicsFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/fragments';
import { ministageSingleAlertTopicFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic/fragments';
import { ministageAuthorFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageAuthor/fragments';
import { ministageSearchFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageSearch/fragments';
import ministageTeaserFragment from 'Paragraphs/components/MinistageParagraph/components/MinistageTeaser/fragments';

export const ministageParagraphFragment = gql`
  fragment MinistageParagraphFragment on MinistageParagraph {
    id
    anchorId
    ministage {
      ...MinistageAccordionFragment
      ...MinistageAuthorFragment
      ...MinistageGuiderFragment
      ...MinistageListicleFragment
      ...MinistageTeaserFragment
      ...MinistageNewsletterFragment
      ...MinistageVideoFragment
      ...MinistageTrendingTopicsFragment
      ...MinistageSingleAlertTopicFragment
      ...MinistageSearchFragment
    }
  }

  ${ministageAccordionFragment}
  ${ministageAuthorFragment}
  ${ministageGuiderFragment}
  ${ministageListicleFragment}
  ${ministageTeaserFragment}
  ${ministageNewsletterFragment}
  ${ministageVideoFragment}
  ${ministageTrendingTopicsFragment}
  ${ministageSingleAlertTopicFragment}
  ${ministageSearchFragment}
`;
