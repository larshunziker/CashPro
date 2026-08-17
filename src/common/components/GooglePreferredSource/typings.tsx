import { ReactElement } from 'react';
import { ButtonProps } from '../Button/typings';

export type GooglePreferredSourceFactoryOptions = {
  Button: ButtonComponent;
  ExplanationButton: ButtonComponent;
  styles: GooglePreferredSourceFactoryOptionsStyles;
};

export type GooglePreferredSourceFactoryOptionsStyles = {
  GooglePreferredSource: string;
};

export type GooglePreferredSourceProps = {};

export type ButtonComponent = (props: ButtonProps) => ReactElement;
