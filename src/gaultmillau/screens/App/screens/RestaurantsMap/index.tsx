import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import raf from 'raf';
import { loadModule } from '../../../../../shared/helpers/async';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/withAsyncData'. '/Users/bhs/code/work/ra */
import withAsyncData from '../../../../../shared/decorators/withAsyncData';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/withLazyComponent'. '/Users/bhs/code/wor */
import withLazyComponent from '../../../../../shared/decorators/withLazyComponent';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import { RestaurantMapProps } from './typings';

const RestaurantsMapLoader = ({
  query,
  restaurantsData,
  RestaurantsMapLazy,
  location,
}: RestaurantMapProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    raf(() => {
      dispatch(setLoading(false));
      dispatch(
        setScreenReady(true, {
          pathname: location.pathname,
          ...getTealiumData({
            object: {
              preferredUri: location.pathname,
              __typename: 'RestaurantsMap',
            },
          }),
        }),
      );
    });
  }, [dispatch, location.pathname]);
  return (
    (RestaurantsMapLazy && restaurantsData && (
      // @ts-ignore
      <RestaurantsMapLazy
        data={restaurantsData}
        query={query || ''}
        routerLocation={location}
      />
    )) ||
    null
  );
};

const loadRestaurantsMap = () =>
  import('./components/RestaurantsMapLazy').then(loadModule);

const withRestaurantsMapComponent = withLazyComponent(
  loadRestaurantsMap,
  'RestaurantsMapLazy',
);

/* @ts-ignore TODO: TS7031 ->  Binding element 'restaurantsApiUrl' implicitly has an 'any' type. */
const loadRestaurantsData = ({ restaurantsApiUrl }) =>
  fetch(restaurantsApiUrl).then((response) => response.json());

const withRestaurantsData = withAsyncData(
  loadRestaurantsData,
  'restaurantsData',
);

export default compose<any, any>(
  withParams,
  withAppNexus({
    parseTrackingData: (props: RestaurantMapProps) =>
      parseTrackingData({
        ...props,
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Data'. */
        data: null,
        articleType: 'RestaurantsMap',
      }),
  }),
  withRestaurantsMapComponent,
  withRestaurantsData,
)(RestaurantsMapLoader);
