import { AspectRatioItem } from '../../../shared/helpers/resizeByAspectRatio';
import { SLIDE_ALIGNMENT_CENTER } from './constants';

/**
 * @desc: Get the range of slides to show, depending on preloadCount
 */
export const viewportRange = (
  length: number,
  activeIndex: number,
  preloadCount: number,
): Array<number> => {
  const slidesToShow: number = preloadCount * 2 + 1;
  const maxSlides: number = preloadCount === -1 ? length : slidesToShow;

  // @ts-ignore
  return new Array(maxSlides).fill().map((_: any, index: number): number => {
    const position: number = activeIndex - preloadCount + index;
    const slide: number = position - Math.round(position / length) * length;

    return slide >= 0 ? slide : slide + length;
  });
};

/**
 * @desc Recursive clone children until we have at least minimumItems
 */
export const getKeyMappingList = (
  childrenCount: number,
  minimumItems: number,
  accumulator: Array<number> = [],
  indices: Array<number> = generatedIndices(childrenCount),
): Array<number> => {
  if (childrenCount === 0) {
    return [0];
  }
  // Set up accumulator if unset
  const acc = accumulator.length === 0 ? indices : accumulator;

  if (acc.length <= minimumItems) {
    return getKeyMappingList(
      childrenCount,
      minimumItems,
      acc.concat(indices),
      indices,
    );
  }
  return acc;
};

/**
 * @desc Return a list of count indices
 */
export const generatedIndices = (count: number) => [...new Array(count).keys()];

/**
 * @desc: Updates the absolute position for every slide
 */
export const updatePositions = (
  positions: Array<number>,
  count: number,
  keyMappingList: Array<number>,
  sliderWidth: number,
  sliderGutter = 0,
  preloadCount: number,
  activeIndex = 0,
  deltaX = 0,
  dynamicWidthSlides = false,
  slideDimensions: Array<AspectRatioItem> = [],
  slideAlignment: string,
): Array<number> => {
  if (!sliderWidth) {
    return positions;
  }

  // get viewport
  const viewport = viewportRange(
    keyMappingList.length,
    activeIndex,
    preloadCount,
  );

  // only use the slides we need
  const slideWidthList = viewport.map(
    (slide): number => slideDimensions[keyMappingList[slide]].width,
  );

  let computedPositions: Array<number>;

  // todo: store sum somehow
  if (dynamicWidthSlides) {
    computedPositions = slideWidthList.map((_, index): number =>
      slideWidthList
        .slice(0, index)
        .reduce((sum, width) => sum + (width + sliderGutter), 0),
    );

    computedPositions = computedPositions.map((width): number =>
      Math.round(
        width -
          (computedPositions[preloadCount] + deltaX) +
          (slideAlignment === SLIDE_ALIGNMENT_CENTER
            ? sliderWidth / 2 - slideWidthList[preloadCount] / 2
            : 0),
      ),
    );
  } else {
    const offset = activeIndex * (sliderWidth + sliderGutter) + deltaX;
    computedPositions = slideWidthList.map(
      (_, index) => (sliderWidth + sliderGutter) * index - offset,
    );
  }

  return computedPositions;
};

// Only swipe to next/prev slide if the swipe distance is > 50px
// TODO: make the min distance relative
export const swipeTo = (callback: Function, deltaX: number) => {
  if (deltaX < -50 || deltaX > 50) {
    callback();
  }
};
