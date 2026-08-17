/**
 * @file resize items based on max width / height
 */

/**
 * @TODO
 *
 * 2. Fix code style and documentation.
 */

/**
 * @desc: Resize a to newB percent of oldB
 */
const resizeByPercent = (a: number, oldB: number, newB: number): number =>
  Math.round((a / 100) * ((100 / oldB) * newB));

/**
 * @desc: Resize dimensions to fit into a maxWidth/maxHeight and keep the aspect ratio
 */
export default (
  dimensions: Dimensions[],
  maxWidth: number,
  maxHeight: number,
): any => {
  const newDimensions: Dimensions[] = dimensions.map(
    (originalDimension: Dimensions) => {
      const width: number = originalDimension.width;
      const height: number = originalDimension.height;

      let newWidth: number = width;
      let newHeight: number = height;

      if (width > maxWidth) {
        newHeight = resizeByPercent(height, width, maxWidth);
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = resizeByPercent(width, height, maxHeight);
        } else {
          newWidth = maxWidth;
        }
      } else if (height > maxHeight) {
        newHeight = maxHeight;
        newWidth = resizeByPercent(width, height, maxHeight);
      }

      return {
        width: newWidth,
        height: newHeight,
      };
    },
  );

  const firstDimension: Dimensions = newDimensions[0];

  return {
    maxWidth: firstDimension.width,
    maxHeight: firstDimension.height,
    items: newDimensions,
  };
};
