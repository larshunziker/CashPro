import { ComponentType, ReactElement, ReactNode } from 'react';

export type EmbedConsentBlockFactoryOptions = {
  styles:
    | EmbedConsentBlockFactoryOptionsStyles
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    | ((props) => EmbedConsentBlockFactoryOptionsStyles);
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Button: (props) => ReactElement;
  consentBlockContent: ConsentBlockContent;
};

export type EmbedConsentBlockProps = {
  children?: ReactNode;
  language?: string;
};

export type EmbedConsentBlockFactoryOptionsStyles = {
  Wrapper: string;
  Title: string;
  Link: string;
  Lead: string;
  Container: string;
  LinkWrapper: string;
};

export type ConsentBlockContent = {
  title: string;
  buttonLabel: string;
  leadContent: string;
  linkLabel: string;
};

export type EmbedConsentBlockComponent = ComponentType<EmbedConsentBlockProps>;
