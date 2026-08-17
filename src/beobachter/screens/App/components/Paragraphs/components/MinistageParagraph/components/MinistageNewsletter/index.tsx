import React from 'react';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import MinistageNewsletterSignup from './components/MinistageNewsletterSignup';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/Ap */
import { MAILCHIMP_LIST_REQUEST } from './mutations';
import {
  TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import { MinistageNewsletterProps } from './typings';

const MinistageNewsletter = ({
  ministageNewsletter,
  origin,
}: MinistageNewsletterProps) => {
  const [mailchimpListRequest] = useMutation(MAILCHIMP_LIST_REQUEST);

  return (
    ministageNewsletter && (
      <div
        data-testid="ministage-newsletter-signup-default"
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
        )}
      >
        <MinistageNewsletterSignup
          ministageNewsletter={ministageNewsletter}
          mutate={mailchimpListRequest}
          origin={origin}
        />
      </div>
    )
  );
};

export default MinistageNewsletter;
