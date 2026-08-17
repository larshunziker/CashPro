import React from 'react';

import { compose, pure } from 'recompose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import AppNexus from '../../../../components/AppNexus';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Logo from '../../../../components/Logo/index';
import Teaser from '../../../../components/Teaser';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_SPONSOR } from '../../../../../../../shared/constants/teaser';
import { LOGO_HZ_BRAND_REPORT } from '../../../../components/Logo/constants';
import { SPONSOR_DEFAULT_TITLE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
const Sponsors = ({ data }) => {
  const sponsorPage = data?.environment?.routeByPath?.object || {};

  const sponsors =
    (Array.isArray(data?.environment?.sponsors?.edges) &&
      data?.environment?.sponsors?.edges?.length > 0 &&
      data?.environment?.sponsors?.edges) ||
    null;

  return (
    <div className={`sponsor-overview ${styles.Wrapper}`}>
      <div className={styles.HeaderBackground}>
        <div className={sections.Container}>
          {sponsorPage?.activeMenuTrail && (
            <Breadcrumbs
              pageUrl={sponsorPage.preferredUri}
              items={sponsorPage.activeMenuTrail}
              title={sponsorPage.title || SPONSOR_DEFAULT_TITLE}
            />
          )}
          <div className={styles.BrandReportWrapper}>
            <div className={styles.BrandReportLogoWrapper}>
              <Logo
                type={LOGO_HZ_BRAND_REPORT}
                origin={ADVERTISING_TYPE_BRANDREPORT}
              />
            </div>
          </div>
          <h1 className={styles.SecondaryTitle}>
            {sponsorPage.shortTitle || sponsorPage.title || ''}
          </h1>
          <p className={styles.HeaderDescription}>{sponsorPage.lead || ''}</p>
        </div>
      </div>
      {sponsors && (
        <div className={grid.Container}>
          <div className={grid.Row}>
            {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
            {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
            {sponsors.map((item, index) => {
              return (
                <>
                  {index === 1 && (
                    <div
                      className={classNames(
                        'ad-wrapper',
                        'ad-wrapper-mobile',
                        grid.ColXs24,
                        styles.AdContainer,
                      )}
                    >
                      <AppNexus slot={MMR_1} deviceType="mobile" />
                    </div>
                  )}
                  <div
                    className={classNames(
                      grid.ColXs24,
                      grid.ColSm12,
                      grid.ColMd8,
                    )}
                    key={`sponsor-list-${item.node.id}`}
                  >
                    <div className={styles.TeaserWrapper}>
                      <Teaser
                        component={TEASER_LAYOUT_SPONSOR}
                        {...item}
                        itemIndex={index}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default pure(
  compose<any, any>(
    withHelmet({
      /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
      getNode: (mapProps) =>
        mapProps?.data?.environment?.routeByPath?.object || null,
      /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
      getFallbackTitle: (mapProps) =>
        (!!mapProps && SPONSOR_DEFAULT_TITLE) || '',
      rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
    }),
    withAppNexus({
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      parseTrackingData: (props) =>
        parseTrackingData({
          ...props,
          articleType: 'Sponsors',
        }),
    }),
  )(Sponsors),
);
