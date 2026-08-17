import { MailchimpSubscribeFormComponent } from './components/MailchimpSubscribeForm/typings';

export type MinistageNewsletterProps = {
  ministageNewsletter: MinistageNewsletter;
  origin?: string;
  addClass?: string;
  useFullwidthBackground?: boolean;
  isSplittedPageLayout?: boolean;
};

export type MinistageNewsletterFactoryOptions = {
  MailchimpSubscribeForm: MailchimpSubscribeFormComponent;
  imageStyles: ImageStylesObject;
  styles:
    | MinistageNewsletterFactoryOptionsStyles
    | ((
        props: MinistageNewsletterProps,
      ) => MinistageNewsletterFactoryOptionsStyles);
};

export type MinistageNewsletterFactoryOptionsStyles = {
  Background: string;
  Wrapper: string;
  Container: string;
  InnerWrapper: string;
  Row: string;
  ContentWrapper: string;
  HeaderWrapper: string;
  HeaderText: string;
  LeadText: string;
  HiddenTeaserImage: string;
  PictureWrapper: string;
  Picture: string;
};
