/**
 * @file    Ministage Teaser Fragments
 * @author  Damian Bucki <damian.bucki@dreamlab.pl>
 * @date    2019-01-31
 *
 */

import { gql } from '@apollo/client';

export const ministageTeaserFragment = gql`
  fragment MinistageTeaserFragment on MinistageTeaser {
    headline
    subhead
    lead
    image {
      id
      relativeOriginPath
      focalPointX
      focalPointY
      alt
    }
    link {
      label
      path
      routed
    }
  }
`;
