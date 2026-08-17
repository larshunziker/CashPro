import { ComponentType } from 'react';

export type AppNexusFactoryProps = {
  slot: string;
  isMultiPlacement?: boolean;
  isAdSuppressed?: boolean;
  deviceType?: 'mobile' | 'tabletDesktop';
  excludeSizes?: Record<string, string>;
};

export type AppNexusFactoryOptionsStyles = {
  AdSlot: string;
};

export type AppNexusFactoryOptionsStylesByProps<T> = (
  props: T,
) => AppNexusFactoryOptionsStyles;

export type AppNexusFactoryOptions<T> = {
  mapViewportToAdViewport: (
    viewportOrViewportLabel: Viewport | string,
  ) => string;
  styles: AppNexusFactoryOptionsStyles | AppNexusFactoryOptionsStylesByProps<T>;
};

export type AppNexusComponent = ComponentType<AppNexusFactoryProps>;
