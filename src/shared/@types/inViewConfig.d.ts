declare interface InViewConfig {
  root?: string; // this should be a classname or an id (document.querySelector(root))
  rootMargin?: string;
  threshold?: number | Array<number>;
  triggerOnce?: boolean;
}
