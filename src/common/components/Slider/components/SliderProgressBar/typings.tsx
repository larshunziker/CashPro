import { ComponentType } from 'react';

export type SliderProgressBarProps = {
  activeIndex: number;
  slideInterval: number;
  settingsState?: SettingsState;
  locationState?: LocationState;
};

export type SliderProgressBarFactoryOptionsStyles = {
  Wrapper: string;
  ProgressBar: string;
};

export type SliderProgressBarFactoryOptionsStylesByProps<T> = (
  props: T,
) => SliderProgressBarFactoryOptionsStyles;

export type SliderProgressBarFactoryOptions<T> = {
  styles:
    | SliderProgressBarFactoryOptionsStyles
    | SliderProgressBarFactoryOptionsStylesByProps<T>;
};

export type SliderProgressBarComponent = ComponentType<SliderProgressBarProps>;
