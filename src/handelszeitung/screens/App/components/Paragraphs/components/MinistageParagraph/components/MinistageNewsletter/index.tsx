import React from 'react';
import classNames from 'classnames';
import MinistageNewsletterSignupDefault from './components/MinistageNewsletterSignupDefault';
import {
  TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const MinistageNewsletter = (props) => {
  return (
    <div
      data-testid="ministage-newsletter-signup-default"
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
      )}
    >
      <MinistageNewsletterSignupDefault
        ministageNewsletter={props.ministageNewsletter}
        {...props}
      />
    </div>
  );
};

export default MinistageNewsletter;
