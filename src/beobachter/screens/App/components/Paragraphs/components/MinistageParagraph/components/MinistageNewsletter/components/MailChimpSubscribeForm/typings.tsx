import { ReactElement } from 'react';

export type MailChimpSubscribeFormProps = {
  ministageNewsletter: MinistageNewsletter;
  mutate: Function;
};

export type MailChimpSubscribeFormComponent = (
  props: MailChimpSubscribeFormProps,
) => ReactElement;
