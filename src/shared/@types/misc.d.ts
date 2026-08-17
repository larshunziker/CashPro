declare type RefObject = {
  current: any;
};

declare type MetaLink = {
  href: string;
  rel: string;
  hreflang: string;
};

declare interface NodeModule {
  hot: {
    accept(path?: string, fn: () => void, callback?: () => void): void;
  };
}
