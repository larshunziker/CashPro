/* istanbul ignore file */

import React from 'react';
// import { useDispatch } from 'react-redux';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { getFormattedPublicationDateByProps } from '../../shared/helpers';
// import { setInstrumentKeys } from '../../../../../../../shared/actions/autoUpdate';
import { STYLE_3X2_440 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'valors' implicitly has an 'any' type. */
const StockInfo = ({ valors }) => {
  return (
    <div className={styles.StockInfoWrapper}>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
      {valors?.items?.map?.((item, index) => {
        return (
          <div className={styles.StockName} key={index}>
            {item?.shortName || item.valorName}{' '}
            <span
              className={styles.StockPercentage}
              data-lid={`${item.valorNumber}-${item.valorStockExchange?.originalId}-${item.valorCurrency?.originalId}`}
            >
              0%
            </span>
          </div>
        );
      })}
    </div>
  );
};

const TeaserPortfolioNews = teaserFactory({
  innerContent: (props) => <StockInfo valors={props.valors} />,
  children: (props) => (
    <div className={styles.MobileStockInfo}>
      <StockInfo valors={props.valors} />
    </div>
  ),
  isPublicationDateVisible: true,
  isShortTitleHidden: true,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  formattedPublicationDate: getFormattedPublicationDateByProps,
  teaserImageStyles: {
    style_320: STYLE_3X2_440,
  },
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    Title: styles.TeaserTitle,
    ImageWrapper: styles.TeaserImageWrapper,
    Image: styles.Image,
    BottomLine: styles.BottomLine,
  },
});

export default TeaserPortfolioNews;
