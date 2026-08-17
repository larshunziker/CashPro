import React, { useContext, useState } from 'react';
import Icon from '../../../../../Icon';
import Row from './components/Row';
import Tabs from './components/Tabs';
import { HideRestrictedContent } from '../..';
import { LABEL_MAPPING } from './components/Tabs/constants';
import { INITIAL_RATINGS, MAX_FREE_RATINGS } from './constants';
import styles from './styles.legacy.css';
import { DetailAnalysisProps } from './typings';

const DetailAnalysis = ({ sell, buy, hold }: DetailAnalysisProps) => {
  const detailSell = sell.filter((rating) => rating.text);
  const detailBuy = buy.filter((rating) => rating.text);
  const detailHold = hold.filter((rating) => rating.text);
  const detailAll = [...detailSell, ...detailBuy, ...detailHold];
  const ratings = {
    ALLE: detailAll,
    BUY: detailBuy,
    HOLD: detailHold,
    SELL: detailSell,
  };
  const sortRating = (ratings: Rating[]): Rating[] => {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    return ratings.sort((a, b) => (a.date > b.date ? -1 : 1));
  };
  const [activeTab, setActiveTab] = useState('ALLE');
  const [activeRating, setActiveRating] = useState(sortRating(detailAll));
  const [showMore, setShowMore] = useState(false);
  const hideContent = useContext(HideRestrictedContent);

  const switchTab = (active: string) => {
    setActiveTab(active);
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ ALLE */
    setActiveRating(sortRating(ratings[active]));
    setShowMore(false);
  };
  return (
    <div className={styles.Wrapper}>
      <Tabs
        activeTab={activeTab}
        setActiveTab={switchTab}
        buttons={LABEL_MAPPING}
      />
      {(detailAll?.length > 0 && (
        <p>
          Lesen Sie die detaillierten Statements der Analysten und verfolgen Sie
          die Entwicklung der Einschätzungen über die Jahre.
        </p>
      )) || (
        <p>
          Für dieses Instrument stehen noch keine Detailanalysen zur Verfügung.
        </p>
      )}
      {activeRating.map((rating, index) => {
        if (
          (!showMore && index >= INITIAL_RATINGS) ||
          (hideContent && index >= MAX_FREE_RATINGS)
        ) {
          return null;
        }
        return <Row key={rating.id} {...rating} />;
      })}
      {(activeRating.length > INITIAL_RATINGS && !hideContent && (
        <button
          className={styles.ShowMore}
          onClick={() => setShowMore(!showMore)}
        >
          {(showMore && 'Weniger anzeigen') || 'Mehr anzeigen'}
          <span className={styles.Icon}>
            <Icon type={showMore ? 'IconChevronUp' : 'IconChevronDown'} />
          </span>
        </button>
      )) ||
        null}
    </div>
  );
};

export default DetailAnalysis;
