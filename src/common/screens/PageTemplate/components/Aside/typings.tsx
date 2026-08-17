import { ComponentType } from 'react';

export type GetContentByProps<T> = (props: T) => any;

export type AsideFactoryOptions<T = {}> = {
  content: GetContentByProps<T>;
  styles: {
    readonly Sticky: string;
    readonly Wrapper: string;
    readonly StickyOnScroll?: string;
  };
};

export type AsideProps<P = {}> = {
  props?: Partial<P>;
  pageLayoutType?: string;
  scrollDirection?: string;
};

export type AsideComponent = ComponentType<AsideProps<any>>;
