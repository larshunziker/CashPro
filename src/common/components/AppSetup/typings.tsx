export type AppSetupFactoryOptions = {
  setScrollTop: () => void;
  windowResize: (window: Window) => void;
  windowResizeDebounceValue: number;
  isWindowStateDefinedOnClient?: boolean;
};
