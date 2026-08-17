import { ReactNode } from 'react';

export type ModalOverlayProps = {
  children?: ReactNode;
  isDifferentFlavour: boolean;
  isVisible: boolean;
  isLeftToRight: boolean;
};

type GetStylesByProps = (
  props: ModalOverlayProps,
) => ModalOverlayFactoryOptionsStyles;

export type ModalOverlayFactoryOptions = {
  modalRootId: string;
  setNavigationVisibleAction?: Function;
  styles: ModalOverlayFactoryOptionsStyles | GetStylesByProps;
};

export type ModalOverlayFactoryOptionsStyles = {
  BodyClass: string;
  CenteredOverlay?: string;
  FadeIn: string;
  FadeOut?: string;
  IsDifferentFlavour?: string;
  Wrapper: string;
};
