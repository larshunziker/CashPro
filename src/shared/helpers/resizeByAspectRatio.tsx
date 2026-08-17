/**
 * @file resize items based on aspect ratio
 */

/**
 * @TODO
 *
 * 1. Fix code style and documentation.
 */

export type AspectRatioItem = {
  height: number;
  width: number;
  format?: string;
};

/**
 * @desc: Parse aspect ratio
 */
const parseAspectRatio = (aspectRatio: string): number[] =>
  aspectRatio.split(':').map((item: string): number => parseInt(item, 10));

/**
 * @desc resize single item to contain in given max dimensions
 */
const resizeItem = (
  item: AspectRatioItem,
  maxWidth: number,
  maxHeight: number,
): AspectRatioItem => {
  // create shorthands
  const { height, width }: AspectRatioItem = item;

  // landscape or portrait orientation?
  const resizeFactor: number =
    width > height ? maxWidth / width : maxHeight / height;
  const newWidth: number = Math.round(width * resizeFactor);
  const newHeight: number = Math.round(height * resizeFactor);

  return {
    width: newWidth,
    height: newHeight,
    format: item.format,
  };
};

/**
 * @desc  resize items and calculate maxHeight based on given width and
 *        aspect ratio
 */
export const resize = (
  aspectRatioString: string,
  maxWidth: number,
  items: AspectRatioItem[],
  spacing = 0,
): any => {
  // parse aspect ratio
  const aspectRatio: number[] = parseAspectRatio(aspectRatioString);

  // Include spacing when computing item dimensions
  const maxWidthWithSpacing: number = maxWidth - (maxWidth / 100) * spacing;

  // define max height of container
  const maxHeight: number =
    (maxWidthWithSpacing / aspectRatio[0]) * aspectRatio[1];

  // resize items
  const newItems: AspectRatioItem[] = items.map((item: AspectRatioItem) =>
    resizeItem(item, maxWidthWithSpacing, maxHeight),
  );

  return {
    maxWidth,
    maxHeight,
    items: newItems,
  };
};
