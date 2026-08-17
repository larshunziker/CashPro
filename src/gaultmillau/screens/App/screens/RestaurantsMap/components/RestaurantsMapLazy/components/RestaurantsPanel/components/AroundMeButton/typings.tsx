export type AroundMeButtonProps = {
  retrieveBrowserLocation: () => void;
  hasGeolocationSupport: boolean;
  handleCloseBrowserNote: () => void;
  browserLocationError: string;
  browserLocationPending: boolean;
  isBrowserNoteVisible: boolean;
};
