/**
 * @file Get height based on width and aspect ratio
 */

export default (width: number, aspectRatio: string): number => {
  const ratio: string[] = aspectRatio.split(':');
  return Math.round(
    (width &&
      ratio.length === 2 &&
      (width / parseInt(ratio[0], 10)) * parseInt(ratio[1], 10)) ||
      width,
  );
};
