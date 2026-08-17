import { ComponentType } from 'react';
import { IconComponent } from '../Icon/typings';
import { LoadingSpinnerProps } from '../LoadingSpinner/typings';

export type Pull2RefreshProps = {};

export type Pull2RefreshFactoryOptionsStyles = {
  PullTip: string;
  Spinner: string;
};

export type Pull2RefreshFactoryOptions = {
  styles: Pull2RefreshFactoryOptionsStyles;
  Icon: IconComponent;
  LoadingSpinner: ComponentType<LoadingSpinnerProps>;
};

export type Pull2RefreshComponent = ComponentType<Pull2RefreshProps>;
