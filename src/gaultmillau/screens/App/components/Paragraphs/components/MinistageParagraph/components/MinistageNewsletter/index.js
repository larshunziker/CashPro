/**
 * @file   ministage newsletter
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2016-11-17
 *
 */

import React from 'react';
import { gql } from '@apollo/client';
import MinistageNewsletter from './render';

// ---------------------------------------------------------------------------------- //
// GLUE
// ---------------------------------------------------------------------------------- //

// Wrap the original component so we don't need to alter it.
const MinistageNewsletterWrapper = (props) => (
  <MinistageNewsletter {...props} />
);

MinistageNewsletterWrapper.fragments = {
  ministageNewsletterFragment: gql`
    fragment MinistageNewsletterFragment on MinistageNewsletter {
      headline
      subhead
      lead
      type
      mailchimpList
      mailchimpInterest
      mailchimpAccountId
      image(style: "large") {
        id
        relativeOriginPath
        focalPointX
        focalPointY
      }
    }
  `,
};

export default MinistageNewsletterWrapper;
