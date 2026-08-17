import { EmbedConsentBlockComponent } from './components/EmbedConsentBlock/typings';

export type EmbedParagraphItemProps = Pick<
  EmbedParagraph,
  'autoAdjustHeight'
> & {
  code: string;
  className?: string;
  origin?: string;
  embedWidth?: string;
};

export type EmbedParagraphProps = {
  embedParagraph: EmbedParagraph;
  origin?: string;
};

export type EmbedParagraphFactoryOptionsStyles = {
  Wrapper: string;
  TitleWrapper: string;
  Title: string;
};

export type EmbedParagraphFactoryOptions = {
  windowStateSelector?: WindowStateSelector; // TODO: remove after updating in all publications
  EmbedConsentBlock: EmbedConsentBlockComponent;
  styles:
    | EmbedParagraphFactoryOptionsStyles
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    | ((props) => EmbedParagraphFactoryOptionsStyles);
};

export type ConsentCookie = {
  AwaitingReconsent?: string;
  consentId?: string;
  datestamp?: string;
  geolocation?: string;
  groups?: string;
  hosts?: string;
  interactionCount?: string;
  isIABGlobal?: string;
  landingPath?: string;
  version?: string;
};

export type ConsentGroups = {
  C0001?: string;
  C0002?: string;
  C0003?: string;
  C0004?: string;
  C0005?: string;
  STACK42?: string;
};
