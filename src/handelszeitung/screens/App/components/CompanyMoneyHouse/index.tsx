/**
 * Company Money House
 *
 * @file    Company Money House
 * @author  Thomas Rubattel <thomas.rubattel@ringieraxelspringer.ch>
 * @date    2017-10-19
 *
 */

import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import Img from '../../components/Img';
import { URL_TRACKING_PRAEFIX } from '../MoneyhouseList';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import MoneyHouseLogo from 'graphics/moneyhouseLogo.svg';
import { CompanyMoneyHouseProps } from './typings';

const CompanyMoneyHouse = ({
  branch,
  uri,
  foundationDate,
  headquarter,
  legalForm,
  companyDescription,
  moneyHouseLink,
  addClass = '',
}: CompanyMoneyHouseProps) => {
  // Return null, if all of these props aren't available
  if (
    !branch &&
    !foundationDate &&
    !headquarter &&
    !legalForm &&
    !companyDescription
  ) {
    return null;
  }

  return (
    <div
      data-testid="wrapper"
      className={classNames({
        [styles.Wrapper]: !addClass,
        [addClass]: !!addClass,
      })}
    >
      <h2 className={styles.Title}>Über das Unternehmen</h2>
      <div className={styles.ReferenceWrapper}>
        <div className={styles.Reference}>
          <span className={styles.ReferenceLabel}>präsentiert von</span>
          <Link
            path={`https://www.moneyhouse.ch?${URL_TRACKING_PRAEFIX}`}
            rel="sponsored"
          >
            <Img
              addClass={styles.ReferenceLogo}
              url={MoneyHouseLogo}
              alt="moneyhouse.ch logo"
            />
          </Link>
        </div>
      </div>

      <div className={sections.Section}>
        <div className={classNames(grid.Row, styles.IndicatorsWrapper)}>
          {branch && (
            <div
              data-testid="branch"
              className={classNames(grid.ColSm12, styles.Indicator)}
            >
              <h3 className={styles.IndicatorTitle}>Branche</h3>
              <Link path={uri}>
                <span className={styles.IndicatorValue}>{branch}</span>
              </Link>
            </div>
          )}
          {foundationDate && (
            <div
              data-testid="foundation-date"
              className={classNames(grid.ColSm6, styles.Indicator)}
            >
              <h3 className={styles.IndicatorTitle}>Gründungsdatum</h3>
              <span className={styles.IndicatorValue}>
                {new Date(foundationDate).getFullYear()}
              </span>
            </div>
          )}
          {headquarter && (
            <div
              data-testid="headquarter"
              className={classNames(grid.ColSm6, styles.Indicator)}
            >
              <h3 className={styles.IndicatorTitle}>Firmensitz</h3>
              <span className={styles.IndicatorValue}>{headquarter}</span>
            </div>
          )}
          {legalForm && (
            <div
              data-testid="legalForm"
              className={classNames(grid.ColSm6, styles.Indicator)}
            >
              <h3 className={styles.IndicatorTitle}>Rechtsform</h3>
              <span className={styles.IndicatorValue}>{legalForm}</span>
            </div>
          )}
        </div>
      </div>

      {companyDescription && (
        <div data-testid="companyDescription" className={sections.Section}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <div
                dangerouslySetInnerHTML={{ __html: companyDescription }}
                className={styles.CompanyDescription}
              />
            </div>
          </div>
        </div>
      )}
      {moneyHouseLink && (
        <div data-testid="moneyHouseLink" className={grid.Row}>
          <div className={grid.ColXs24}>
            <Link
              className={styles.Button}
              path={
                moneyHouseLink.includes('?')
                  ? `${moneyHouseLink}&${URL_TRACKING_PRAEFIX}`
                  : `${moneyHouseLink}?${URL_TRACKING_PRAEFIX}`
              }
            >
              <span>Mehr Informationen</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyMoneyHouse;
