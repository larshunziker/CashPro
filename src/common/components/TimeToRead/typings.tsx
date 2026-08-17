export type TimeToReadFactoryOptions = {
  Icon?: React.ComponentType<any>;
  prefix?: string;
  styles: {
    Wrapper: string;
    IconClock?: string;
  };
  language?: string;
};

export type TimeToReadProps = {
  addClass?: string;
  seconds?: number;
};
