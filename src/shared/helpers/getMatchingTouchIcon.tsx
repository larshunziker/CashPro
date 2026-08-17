type IconSizes = {
  [size: string]: string;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'location' implicitly has an 'any' type. */
export const getMatchingTouchIcon = (iconSizes: IconSizes, location) => {
  const len = Object.keys(iconSizes).length;
  let requestingTouchIcon = Object.values(iconSizes)[len - 1];

  for (let i = len; i > 0; i--) {
    const [size, icon] = Object.entries(iconSizes)[i - 1];

    if (
      [
        `/apple-touch-icon-${size}.png`,
        `/apple-touch-icon-${size}-precomposed.png`,
      ].includes(location?.pathname)
    ) {
      requestingTouchIcon = icon;
      break;
    }
  }

  return requestingTouchIcon;
};
