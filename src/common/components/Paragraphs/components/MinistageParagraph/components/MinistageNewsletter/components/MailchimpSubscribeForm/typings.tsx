import { ComponentType, ReactElement } from 'react';
import { DocumentNode } from 'graphql';

export type MailchimpSubscribeFormProps = {
  ministageNewsletter: MinistageNewsletter;
  useFullwidthBackground?: boolean;
};

export type MailchimpSubscribeFormFactoryOptions = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  InputField: (props) => ReactElement;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Button?: (props) => ReactElement;
  mutationQuery: DocumentNode;
  messages?: MailchimpSubscribeFormMessages;
  styles:
    | MailchimpSubscribeFormFactoryOptionsStyles
    | ((
        props: MailchimpSubscribeFormProps,
      ) => MailchimpSubscribeFormFactoryOptionsStyles);
};

export type MailchimpSubscribeFormFactoryOptionsStyles = {
  Form: string;
  Row: string;
  InputWrapper: string;
  EmailWrapper: string;
  SuccessWrapper: string;
  SuccessTick: string;
  SuccessSubmission: string;
  ButtonWrapper: string;
  Button?: string;
  ButtonActivated?: string;
  ButtonDeactivated?: string;
};

export type MailchimpSubscribeFormComponent =
  ComponentType<MailchimpSubscribeFormProps>;

export type MailchimpSubscribeFormMessages = {
  labelSubmission: string;
  inputInstruction: string;
  successSubmission: string;
  errorValidation: string;
};
