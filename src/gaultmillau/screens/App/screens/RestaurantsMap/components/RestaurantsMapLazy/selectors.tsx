//

import intersection from 'lodash.intersection';
import { createSelector } from 'reselect';
import { hasMatchedSearchTerm } from './helpers';

/* @ts-ignore TODO: TS7006 ->  Parameter 'deg' implicitly has an 'any' type. */
const deg2rad = (deg) => deg * (Math.PI / 180);

/* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
const calculateDistance = (a, b) => {
  const earthRadius = 6371; // Radius of the earth in kilometers.
  const degLat = deg2rad(b.lat - a.lat);
  const degLon = deg2rad(b.lng - a.lng);

  const x =
    Math.sin(degLat / 2) * Math.sin(degLat / 2) +
    Math.cos(deg2rad(a.lat)) *
      Math.cos(deg2rad(b.lat)) *
      Math.sin(degLon / 2) *
      Math.sin(degLon / 2);

  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

  return earthRadius * y;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'ids' implicitly has an 'any' type. */
const createResultsSelector = (data, ids) => {
  // Base selectors
  /* @ts-ignore TODO: TS7031 ->  Binding element 'min' implicitly has an 'any' type. */
  const minRatingValueSelector = ({ min }) => min || 0;
  /* @ts-ignore TODO: TS7031 ->  Binding element 'max' implicitly has an 'any' type. */
  const maxRatingValueSelector = ({ max }) => max || 0;
  /* @ts-ignore TODO: TS7031 ->  Binding element 'query' implicitly has an 'any' type. */
  const searchTermSelector = ({ query }) => query || '';
  /* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
  const userLocationSelector = ({ location }) => {
    if (location && location.lat !== null && location.lng !== null) {
      return location;
    }

    return null;
  };

  // Find restaurant
  /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
  const restaurantByIdSelector = (id) => data[id];

  // Rich data selector (with distance).
  const dataSelector = createSelector(
    userLocationSelector,
    (userLocation) =>
      (userLocation &&
        Object.keys(data).reduce(
          (carry, current) => ({
            ...carry,
            [current]: {
              ...data[current],
              distance: calculateDistance(userLocation, data[current]),
            },
          }),
          {},
        )) ||
      data,
  );

  // Sorted ids selector (based on distance).
  const idsSelector = createSelector(
    userLocationSelector,
    dataSelector,
    (userLocation, selectedData) =>
      (userLocation &&
        /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
        ids.slice(0).sort((a, b) => {
          const aDistance = selectedData[a].distance || 0;
          const bDistance = selectedData[b].distance || 0;

          if (aDistance > bDistance) {
            return 1;
          }

          if (aDistance < bDistance) {
            return -1;
          }

          return 0;
        })) ||
      ids,
  );

  // Filters
  const minRatingSelector = createSelector(
    minRatingValueSelector,
    dataSelector,
    idsSelector,
    (minRating, selectedData, selectedIds) => {
      if (minRating === null) {
        return selectedIds;
      }

      /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
      return selectedIds.filter((id) => selectedData[id].rating >= minRating);
    },
  );

  const maxRatingSelector = createSelector(
    maxRatingValueSelector,
    dataSelector,
    idsSelector,
    (maxRating, selectedData, selectedIds) => {
      if (maxRating === null) {
        return selectedIds;
      }

      /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
      return selectedIds.filter((id) => selectedData[id].rating <= maxRating);
    },
  );

  const filterRatingSelector = createSelector(
    minRatingSelector,
    maxRatingSelector,
    (minResults, maxResults) => intersection(minResults, maxResults),
  );

  // Text search
  const searchBySearchTermSelector = createSelector(
    searchTermSelector,
    dataSelector,
    idsSelector,
    (term, selectedData, selectedIds) => {
      if (term === null) {
        return selectedIds;
      }

      /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
      return selectedIds.filter((id) =>
        hasMatchedSearchTerm(selectedData[id].city || '', term),
      );
    },
  );

  // Cumulate results
  const cumulateResultsSelector = createSelector(
    filterRatingSelector,
    searchBySearchTermSelector,
    (filterResults, searchResults) =>
      intersection(filterResults, searchResults),
  );

  const filterResultsSelector = createSelector(
    cumulateResultsSelector,
    dataSelector,
    (cumulateResults, selectedData) =>
      cumulateResults.map((id: string) => selectedData[id]),
  );

  return {
    filterResults: filterResultsSelector,
    restaurantById: restaurantByIdSelector,
  };
};

export default createResultsSelector;
