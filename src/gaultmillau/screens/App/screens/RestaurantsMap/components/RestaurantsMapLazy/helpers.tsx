/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.orderby'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.or */
import orderBy from 'lodash.orderby';
import { MIN_RATING } from './constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'text' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'term' implicitly has an 'any' type. */
export const hasMatchedSearchTerm = (text, term) => {
  const textLowerCase = text.toLowerCase();
  const termLowerCase = term.toLowerCase();
  const matchesSearchTerm = textLowerCase.indexOf(termLowerCase) !== -1;

  return matchesSearchTerm;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'name' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'address' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'city' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'zip' implicitly has an 'any' type. */
export const getGoogleMapsLink = ({ name, address, city, zip }) => {
  const googlemapsUrl = 'https://maps.google.com/maps/dir//';
  const urlQuery = encodeURIComponent(`${name}, ${address}, ${zip} ${city}`);

  return googlemapsUrl + urlQuery;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'results' implicitly has an 'any' type. */
const orderByRatingAndName = (results, desc = true) =>
  orderBy(results, ['rating', 'name'], [desc ? 'desc' : 'asc', 'asc']);

/**
 * Turns some strings into numbers and populates city
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'restaurant' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'cities' implicitly has an 'any' type. */
const castAndPopulateRestaurantFields = (restaurant, cities) => ({
  ...restaurant,
  city: cities[restaurant.cityId],
  lat: parseFloat(restaurant.lat),
  lng: parseFloat(restaurant.lng),
  rating: parseInt(restaurant.rating, 10) || MIN_RATING - 1, // there are restaurants without a rating, in order to display them on the map, I updated the filter to display restaurants with a min rating of 11
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'restaurants' implicitly has an 'any' type. */
export const normalizeRestaurants = (restaurants) => {
  if (restaurants && restaurants.results) {
    const data = {};
    const cities = restaurants && restaurants.mapped_values;
    const sortedResults = orderByRatingAndName(restaurants.results);
    /* @ts-ignore TODO: TS7006 ->  Parameter 'restaurant' implicitly has an 'any' type. */
    const ids = sortedResults.map((restaurant) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      data[restaurant.id] = castAndPopulateRestaurantFields(restaurant, cities);

      return restaurant.id;
    });

    return {
      data,
      ids,
    };
  }

  return restaurants;
};
