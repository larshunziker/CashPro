import { MouseEvent, ReactElement, ReactNode } from 'react';

export type SwipeInteractionButtonComponent = (
  props: SwipeInteractionButtonProps,
) => ReactElement;

export type SwipeInteractionButtonStyles = {
  Button: string;
  HideButton: string;
  InViewAnimation: string;
};

export type SwipeInteractionButtonFactoryOptionsStylesByProps<T> = (
  props: T,
) => SwipeInteractionButtonStyles;

export type SwipeInteractionButtonFactoryOptions<T = {}> = {
  styles:
    | SwipeInteractionButtonStyles
    | SwipeInteractionButtonFactoryOptionsStylesByProps<T>;
};

type Direction = 'next' | 'prev';

export type SwipeInteractionButtonProps = {
  onClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
  isHidden?: boolean;
  addClass?: string;
  direction: Direction;
  children: ReactNode;
};
