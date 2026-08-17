export const getRecommendationItems = (
  newerItems: Array<any>,
  olderItems: Array<any>,
): Array<any> => {
  const newerItemsCopy: Array<any> = [...newerItems];
  const olderItemsCopy: Array<any> = [...olderItems];

  if (newerItemsCopy.length >= 2 && olderItemsCopy.length >= 2) {
    return [
      ...newerItemsCopy.splice(0, 2).reverse(),
      ...olderItemsCopy.splice(0, 2),
    ];
  } else if (newerItemsCopy.length === 1 && olderItemsCopy.length > 0) {
    return [...newerItemsCopy, ...olderItemsCopy.splice(0, 3)];
  } else if (newerItemsCopy.length > 0 && olderItemsCopy.length === 1) {
    return [...newerItemsCopy.splice(0, 3).reverse(), ...olderItemsCopy];
  }

  // Default cases:
  // if the newest video is playing => return 4 old ones
  // if the oldest video is playing => retrun 4 newer ones
  return [...newerItemsCopy.reverse(), ...olderItemsCopy];
};
