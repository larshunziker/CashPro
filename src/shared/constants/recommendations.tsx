// operation query param for the useRecommendations hook
export enum RECOMMENDATION_OPERATION {
  DEFAULT = 'recommendations',
  DYNAMIC = 'dynamic',
  MOST_READ = 'mostRead',
  MOST_COMMENTED = 'mostCommented',
  MOST_SHARED = 'mostShared',
  WITH_RELATED_CONTENT = 'recommendationsWithRelatedContent',
  IN_CHANNEL = 'recommendationsInChannel',
  LATEST_NATIVE_ADVERTISINGS = 'latestNativeAdvertisings',
  WITH_SAME_AUTHOR = 'moreFromSameAuthor',
}

// recommendation types query param for the useRecommendations hook
export enum RECOMMENDATION_TYPE {
  ATERMS = 'aterms',
  UTERMS = 'uterms',
  MTERMS = 'mterms',
  CBRECO = 'cbreco',
  PARSELY = 'parsely',
  NATFIX = 'natfix',
  NATVAR = 'natvar',
  NATLAST = 'natlast',
  NATGOAL = 'natgoal',
  NATONLY = 'natonly',
}
