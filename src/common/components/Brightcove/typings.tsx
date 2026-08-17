import { VideoType } from '../../../shared/helpers/createVideoObjectJsonLd';

export type BrightcoveProps = {
  autoPlay?: boolean;
  muted?: boolean;
  video: VideoType;
  isObserveForAutoplayEnabled?: boolean;
  hasToLazyLoadBrightcoveScript?: boolean;
  origin?: string;
};

export type BrightcoveFactoryOptions = {
  accountId: string;
  playerId: string;
  skipButtonDelay?: number;
  overlayAdLabel?: string | Function;
  skipButtonLabel?: string | Function;
  skipButtonDelayLabel?: string | Function;
};
