export type SwipeIndicatorProps = {
  slideCount: number;
  activeIndex: number;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  dotClickHandler: (index) => void;
};
