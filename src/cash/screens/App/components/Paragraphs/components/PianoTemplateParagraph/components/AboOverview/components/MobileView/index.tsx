import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import storageAvailable from '../../../../../../../../../../../shared/helpers/storage';
import locationStateSelector from '../../../../../../../../../../shared/selectors/locationStateSelector';
import { useSubscriptions } from '../../../../../../../../../../shared/hooks/useSubscriptions';
import Card from '../Card';
import styles from './styles.legacy.css';
import { MobileDataProps } from '../../typings';

const MobileView = ({ cards, id }: MobileDataProps) => {
  const isInitialPage = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isInitialPage,
  );
  const action = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.action,
  );
  const subscriptions = useSubscriptions();

  const initialActiveState =
    (storageAvailable('localStorage') &&
      localStorage.getItem(`pianoAboCardVisibility-${id}`)) ||
    null;

  const actionRef = useRef(action);
  const idRef = useRef(id);

  useEffect(() => {
    if (actionRef.current === 'POP') {
      localStorage.removeItem(`pianoAboCardVisibility-${idRef.current}`);
    }
  }, []);

  const [cardsVisibility, setCardsVisibility] = useState(
    (initialActiveState &&
      !isInitialPage &&
      action === 'POP' &&
      JSON.parse(initialActiveState)) || [true, false, false, false],
  );

  const toggleCard = (index: number) => {
    const activeCard = cardsVisibility.map(
      (card: boolean, i: number) => (index === i && !card) || false,
    );

    localStorage.setItem(
      `pianoAboCardVisibility-${id}`,
      JSON.stringify(activeCard) || '',
    );
    return setCardsVisibility(activeCard);
  };

  return (
    <div className={styles.Wrapper}>
      {(Array.isArray(cards) &&
        cards.map((card, key) => {
          card.hideButton = subscriptions?.isAuthenticated && key === 3;
          card.hasBadge = key === 0;

          return (
            <div key={key}>
              <Card
                {...card}
                toggleCard={() => toggleCard(key)}
                active={cardsVisibility[key]}
              />
            </div>
          );
        })) ||
        null}
    </div>
  );
};

export default MobileView;
