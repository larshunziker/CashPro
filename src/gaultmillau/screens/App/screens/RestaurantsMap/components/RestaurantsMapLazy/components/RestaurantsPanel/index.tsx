import React from 'react';
import AroundMeButton from './components/AroundMeButton';
import RestaurantsCards from './components/RestaurantsCards';
import RestaurantsPager from './components/RestaurantsPager';
import RestaurantsSearch from './components/RestaurantsSearch';
import styles from './styles.legacy.css';
import { RestaurantsPanelProps } from './typings';

const RestaurantsPanel = ({
  data,
  totalResults,
  query,
  setLocation,
  setQuery,
  hasNextPage,
  hasPreviousPage,
  activeMarker,
  setActiveMarker,
  setPanelActive,
  routerLocation,
  page,
  setPage,
}: RestaurantsPanelProps) => (
  <div className={styles.Wrapper}>
    <div className={styles.Controls}>
      <RestaurantsSearch query={query} setQuery={setQuery} />
      <p className={styles.Stats}>{`${totalResults || 0} Restaurants`}</p>
      <AroundMeButton
        routerLocation={routerLocation}
        setLocation={setLocation}
      />
    </div>

    <RestaurantsCards
      data={data}
      activeMarker={activeMarker}
      setActiveMarker={setActiveMarker}
      setPanelActive={setPanelActive}
    />
    {/* @ts-ignore TODO: TS2786 ->  'RestaurantsPager' cannot be used as a JSX component. */}
    <RestaurantsPager
      hasPreviousPage={hasPreviousPage}
      hasNextPage={hasNextPage}
      page={page}
      setPage={setPage}
    />
  </div>
);

export default RestaurantsPanel;
