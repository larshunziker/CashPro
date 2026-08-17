import React from 'react';

import { compose, withHandlers } from 'recompose';
import withViewportProps from '../../../../../../../../../../shared/decorators/withViewportProps';
import RestaurantsCard from './components/RestaurantsCard';
import styles from './styles.legacy.css';
import { RestaurantsCardsProps } from './typings';

type RestaurantsCardsPropsInner = RestaurantsCardsProps & {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  setActive: (props) => void;
};

const renderRestaurantCards = ({
  data,
  setActive,
}: RestaurantsCardsPropsInner) =>
  data.map(
    ({
      address,
      city,
      id,
      name,
      email,
      imgUrl,
      secondaryName,
      distance,
      path,
      rating,
      tel,
      zip,
    }) => (
      <RestaurantsCard
        id={id}
        distance={distance}
        address={address || ''}
        city={city || ''}
        email={email || ''}
        imgUrl={imgUrl || ''}
        key={`restaurants-card-${id}`}
        name={name || ''}
        secondaryName={secondaryName || ''}
        path={path || ''}
        rating={rating || 0}
        tel={tel || ''}
        zip={zip || ''}
        setActive={() => setActive(id)}
      />
    ),
  );

const RestaurantsCards = ({ data, setActive }: RestaurantsCardsPropsInner) =>
  data.length > 0 && (
    <div className={styles.Cards}>
      {renderRestaurantCards({ data, setActive })}
    </div>
  );

const extendWithHandlers = withHandlers({
  setActive:
    /* @ts-ignore TODO: TS7031 ->  Binding element 'isMobile' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setActiveMarker' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setPanelActive' implicitly has an 'any' type. */


      ({ isMobile, setActiveMarker, setPanelActive }) =>
      /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
      (id) => {
        setActiveMarker(id, true);

        if (isMobile) {
          setPanelActive(false);
        }
      },
});

export default compose<any, any>(
  withViewportProps,
  extendWithHandlers,
  // @ts-ignore
)(RestaurantsCards);
