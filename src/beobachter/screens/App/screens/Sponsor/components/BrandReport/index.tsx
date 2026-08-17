import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withEnvironmentMap'. '/Users/bhs/c */
import withEnvironmentMap from '../../../../../../../shared/decorators/withEnvironmentMap';
import withAppNexus from '../../../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import TeaserGrid from '../../../../components/TeaserGrid';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_SPONSOR } from '../../../../components/TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { BrandReportProps } from './typings';

type BrandReportPropsInner = BrandReportProps;

const getDefaultTitle = () => 'BrandReport';

const BrandReport = ({ data }: BrandReportPropsInner) => {
  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<RouteObjectInterface> | undefined' is not assignable to type 'LandingPage'. */
  const landingPage: LandingPage = data?.routeByPath?.object;

  const sponsors =
    (data &&
      data.sponsors &&
      data.sponsors.edges.length > 0 &&
      data.sponsors.edges) ||
    null;

  return (
    <div className={`sponsor-overview ${styles.Wrapper}`}>
      <div className={styles.HeaderBackground}>
        <div className={grid.Container}>
          <div className={styles.BrandReportLogoWrapper}>
            <span className={styles.BrandReport}>BrandReport</span>
          </div>

          <div className={classNames(grid.ColXl16, grid.ColOffsetXl4)}>
            <p className={styles.HeaderDescription}>
              {landingPage?.lead || ''}
            </p>
          </div>
        </div>
      </div>
      <div className={grid.Container}>
        {sponsors && (
          <TeaserGrid
            layout={GRID_LAYOUT_TEASER_SPONSOR}
            items={ensureTeaserInterface(sponsors)}
          />
        )}
      </div>
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) => (!!mapProps && getDefaultTitle()) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withEnvironmentMap,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        withEnvironmentMap: true,
        articleType: 'LandingPage',
      }),
  }),
)(BrandReport);
