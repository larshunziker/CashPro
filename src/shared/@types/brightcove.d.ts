// @TODO: this typing is not complete. add more parameters when required
export type BrightcovePlayer = {
  id_: string;
  play: Function;
  pause: Function;
  muted: Function;
  volume: Function;
  setTimeout: Function;
  id: Function;
  played: Function;
  isFullscreen_: boolean;
  dispose: Function;
  textTracks: Function;
  catalog: {
    getVideo: Function;
  };
  on: Function;
  ima3: any;
  mediainfo: Record<string, any>;
  ready: Function;
  overlay: Function;
};
