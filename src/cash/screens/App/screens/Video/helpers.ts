export const getRecommendationItems = (
  newerItems: Array<any>,
  olderItems: Array<any>,
): Array<any> => {
  const newerItemsCopy: Array<any> = [...newerItems];
  const olderItemsCopy: Array<any> = [...olderItems];

  // Return three new and three old items if there are many new and old videos
  if (newerItemsCopy.length >= 3 && olderItemsCopy.length >= 3) {
    return [
      ...newerItemsCopy.splice(0, 3).reverse(),
      ...olderItemsCopy.splice(0, 3),
    ];
    // Return all old videos and fill up the array with new videos
  } else if (newerItemsCopy.length > olderItemsCopy.length) {
    return [
      ...newerItemsCopy.splice(0, 6 - olderItemsCopy.length).reverse(),
      ...olderItemsCopy,
    ];
    // Return all new videos and fill up the array with old videos
  } else if (newerItemsCopy.length < olderItemsCopy.length) {
    return [
      ...newerItemsCopy,
      ...olderItemsCopy.splice(0, 6 - newerItemsCopy.length),
    ];
  }

  // Default: just fill the array with all new and old items
  return [...newerItemsCopy.reverse(), ...olderItemsCopy];
};
