import { VideoType } from '../../../shared/helpers/createVideoObjectJsonLd';
export type JWPlayerProps = {
  autoPlay?: boolean;
  muted?: boolean;
  video: VideoType;
  isObserveForAutoplayEnabled?: boolean;
};
export type JWPlayerFactoryOptions = {
  endpoint?: string;
  playerId: string;
};
