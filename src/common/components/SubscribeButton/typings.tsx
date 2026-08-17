import type { ComponentType } from 'react';

export type SubscribeButtonComponent = ComponentType<SubscribeButtonProps>;

export type SubscribeButtonFactoryOptions = {
  styles: {
    SubscribeButtonWrapper: string;
    SubscribeButtonActive?: string;
    SubscribeButtonInactive?: string;
    LightTheme: string;
    Text: string;
    Icon: string;
    Active: string;
    Animating: string;
  };
  Icon: React.ComponentType<any>;
  SubscribeIcon?: React.ComponentType<any>;
  followText?: string;
  followingText?: string;
  ToastService:
    | SubscribeButtonToastService
    | (({
        source,
      }: SubscribeButtonToastServiceProps) => SubscribeButtonToastService);
};

type Theme = 'light' | 'default';

type Type = 'keyword' | 'node';

export type SubscribeButtonProps = {
  theme?: Theme;
  id: number;
  type: Type;
  label: string;
  anchorId?: string;
  source?: string;
};

export type SubscribeButtonToastService = {
  displayDefaultErrorToast: Function;
  displayAuthenticationErrorToast: Function;
  displayLimitExceededToast: Function;
  displayPushLimitExceededToast?: Function;
  displayAuthenticationInfoToast: Function;
};

type SubscribeButtonToastServiceProps = {
  source?: string;
};
