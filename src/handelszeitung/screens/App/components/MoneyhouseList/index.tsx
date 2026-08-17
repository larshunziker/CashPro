import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import Img from '../../components/Img';
import MoneyhouseListItem from './components/MoneyhouseListItem';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import lohnCheckLogo from 'graphics/moneyhouse_logo.svg';
import { MoneyhouseListProps } from './typings';

export const URL_TRACKING_PRAEFIX =
  'utm_medium=referral&utm_source=handelszeitung.ch';

const MoneyhouseList = ({ addClass = '', person }: MoneyhouseListProps) => {
  if (
    !person ||
    !person.personPositions ||
    !person.personPositions.edges ||
    person.personPositions.edges.length <= 0
  ) {
    return null;
  }

  return (
    <div
      className={classNames({
        [styles.Wrapper]: !addClass,
        [addClass]: !!addClass,
      })}
    >
      <h2 className={styles.Title}>Karriere</h2>
      <div className={styles.ReferenceWrapper}>
        <div className={styles.Reference}>
          <span className={styles.ReferenceLabel}>präsentiert von</span>
          <Link
            nofollow
            path={`https://www.moneyhouse.ch/?${URL_TRACKING_PRAEFIX}`}
            rel="sponsored"
          >
            <Img
              addClass={styles.ReferenceLogo}
              url={lohnCheckLogo}
              alt="Moneyhouse"
            />
          </Link>
        </div>
      </div>
      <div className={styles.TableWrapper}>
        <div className={classNames(styles.Header, grid.ColSm12)}>
          Unternehmen
        </div>
        <div className={classNames(styles.Header, grid.ColSm8)}>Rollen</div>
        <div className={classNames(styles.Header, grid.ColSm4)}>Seit</div>
      </div>
      {person.personPositions.edges.map((item, index) => (
        <div key={index} className={styles.TableWrapper}>
          {/* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */}
          <MoneyhouseListItem node={item.node} />
        </div>
      ))}
      {person && person.moneyhousePreferredUri && (
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <Link
              className={styles.Button}
              path={
                person.moneyhousePreferredUri.includes('?')
                  ? `${person.moneyhousePreferredUri}&${URL_TRACKING_PRAEFIX}`
                  : `${person.moneyhousePreferredUri}/?${URL_TRACKING_PRAEFIX}`
              }
              label="Bonitätsinformationen zu dieser Person"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyhouseList;
