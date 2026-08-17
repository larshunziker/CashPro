import React from 'react';
import { default as MinistageNewsletter } from '../MinistageNewsletter/components/MinistageNewsletterSignupDefault';
import { MINISTAGE_COMPONENT_NEWSLETTER } from '../../../../../../../../../shared/constants/paragraphs';
import { PUBLICATION_SWISS_INSURANCE } from '../../../../../../../../../shared/constants/publications';
import {
  MAILCHIMP_LIST_ID_SV,
  SV_NEWSLETTER_LEAD,
  SV_NEWSLETTER_TITLE,
} from './constants';

const MinistageSv = () => (
  <MinistageNewsletter
    ministageNewsletter={{
      __typename: MINISTAGE_COMPONENT_NEWSLETTER,
      type: '',
      headline: SV_NEWSLETTER_TITLE,
      lead: SV_NEWSLETTER_LEAD,
      mailchimpList: MAILCHIMP_LIST_ID_SV,
    }}
    origin={PUBLICATION_SWISS_INSURANCE}
  />
);

export default MinistageSv;
