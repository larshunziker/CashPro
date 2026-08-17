export const getRecommendationItems = (
  newerItems: Array<any>,
  olderItems: Array<any>,
): Array<any> => {
  if (newerItems.length >= 2 && olderItems.length >= 2) {
    return [...newerItems.slice(0, 2).reverse(), ...olderItems.slice(0, 2)];
  } else if (newerItems.length === 1 && olderItems.length > 0) {
    return [...newerItems, ...olderItems.slice(0, 3)];
  } else if (newerItems.length > 0 && olderItems.length === 1) {
    return [...newerItems.slice(0, 3).reverse(), ...olderItems];
  }

  // Default cases:
  // if the newest video is playing => return 4 old ones
  // if the oldest video is playing => retrun 4 newer ones
  return [...newerItems.reverse(), ...olderItems];
};
