import { gql } from '@apollo/client';
import MinistageNewsletter from 'Paragraphs/components/MinistageParagraph/components/MinistageNewsletter';
import { ministageDisruptorFragment } from './components/MinistageDisruptor/fragments';
import { ministageTeaserFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageTeaser/fragments';
import { ministageVideoFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageVideo/fragments';

export const ministageParagraphFragment = gql`
  fragment MinistageParagraphFragment on MinistageParagraph {
    id
    anchorId
    ministage {
      ...MinistageTeaserFragment
      ...MinistageNewsletterFragment
      ...MinistageDisruptorFragment
      ...MinistageVideoFragment
    }
  }

  ${ministageTeaserFragment}
  ${MinistageNewsletter.fragments.ministageNewsletterFragment}
  ${ministageDisruptorFragment}
  ${ministageVideoFragment}
`;
