/**
 * @file   ministage newsletter
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2016-11-17
 *
 */

import React from 'react';
import classNames from 'classnames';
import MinistageNewsletterSignup from 'Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/components/MinistageNewsletterSignup';
import {
  TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from 'constants/tracking';

/* eslint-enable max-len */

// ---------------------------------------------------------------------------------- //
// RENDER
// ---------------------------------------------------------------------------------- //

const MinistageNewsletter = (props) => {
  if (!props.ministageNewsletter) {
    return null;
  }

  return (
    <div
      data-testid="ministage-newsletter-signup"
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
      )}
    >
      <MinistageNewsletterSignup
        ministageNewsletter={props.ministageNewsletter}
      />
    </div>
  );
};

export default MinistageNewsletter;
