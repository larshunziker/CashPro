export type LoadingSpinnerFactoryOptions = {
  styles: {
    SpinnerWrapper: string;
    Spinner: string;
    Path: string;
  };
};

export type LoadingSpinnerProps = {
  width?: number;
  height?: number;
};

export type LoadingSpinnerComponent = (
  props: LoadingSpinnerProps,
) => JSX.Element;
