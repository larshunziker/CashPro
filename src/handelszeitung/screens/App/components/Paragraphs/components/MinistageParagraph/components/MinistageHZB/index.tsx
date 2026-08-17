import React from 'react';
import { default as MinistageNewsletter } from '../MinistageNewsletter/components/MinistageNewsletterSignupDefault';
import { MINISTAGE_COMPONENT_NEWSLETTER } from '../../../../../../../../../shared/constants/paragraphs';
import { PUBLICATION_HZB } from '../../../../../../../../../shared/constants/publications';
import {
  HZB_NEWSLETTER_LEAD,
  HZB_NEWSLETTER_TITLE,
  MAILCHIMP_LIST_ID_HZB,
} from './constants';

const MinistageHZB = () => (
  <MinistageNewsletter
    ministageNewsletter={{
      __typename: MINISTAGE_COMPONENT_NEWSLETTER,
      type: '',
      headline: HZB_NEWSLETTER_TITLE,
      lead: HZB_NEWSLETTER_LEAD,
      mailchimpList: MAILCHIMP_LIST_ID_HZB,
    }}
    origin={PUBLICATION_HZB}
  />
);

export default MinistageHZB;
