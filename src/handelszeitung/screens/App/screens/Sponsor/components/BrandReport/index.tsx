import React from 'react';
import pure from 'recompose/pure';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Logo from '../../../../components/Logo';
import Paragraphs from '../../../../components/Paragraphs';
import TeaserGrid from '../../../../components/TeaserGrid';
import StatusPage from './../../../StatusPage';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_CENTER,
} from '../../../../components/SponsorImage';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../../../shared/constants/content';
import { LOGO_HZ_BRAND_REPORT } from '../../../../components/Logo/constants';
import { GRID_LAYOUT_CONTENT_STAGE_FIRST } from '../../../../components/TeaserGrid/gridConfigs/constants';
import { SPONSOR_DEFAULT_TYPE, SPONSOR_PAGE_SIZE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_CENTER,
});

export const BRAND_REPORT_LABEL = 'brand-report';

/* @ts-ignore TODO: TS7031 ->  Binding element 'sponsor' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'page' implicitly has an 'any' type. */
const BrandReport = ({ sponsor, page }) => {
  if (!sponsor) {
    return null;
  }

  if (
    !sponsor ||
    (page !== 1 &&
      (!Array.isArray(sponsor?.nativeAdvertising?.edges) ||
        !sponsor?.nativeAdvertising?.edges?.length))
  ) {
    return <StatusPage />;
  }

  const articles =
    (Array.isArray(sponsor.nativeAdvertising?.edges) &&
      sponsor.nativeAdvertising?.edges?.length > 0 &&
      sponsor.nativeAdvertising?.edges) ||
    null;

  return (
    <div className={`${BRAND_REPORT_LABEL} ${styles.Wrapper}`}>
      <div className={styles.HeaderBackground} />

      <div className={styles.InnerWrapper}>
        <Breadcrumbs
          pageUrl={sponsor.preferredUri}
          items={sponsor.activeMenuTrail}
        />
        <div className={styles.BrandReportWrapper}>
          <div className={styles.BrandReportLogoWrapper}>
            <Logo
              type={LOGO_HZ_BRAND_REPORT}
              origin={ADVERTISING_TYPE_BRANDREPORT}
            />
          </div>
        </div>
        <div className={styles.TeaserImageWrapper}>
          {sponsor && Object.keys(sponsor).length > 0 && (
            <SponsorImage sponsor={sponsor} />
          )}
          <div className={getRestrictedClassName(sponsor.__typename)}>
            <Paragraphs
              colStyle={grid.ColXs24}
              pageBody={sponsor.body}
              origin={SPONSOR_DEFAULT_TYPE}
            />
          </div>
        </div>
        <div className={grid.Row}>
          {/* eslint-disable react/no-danger */}
          <div
            className={classNames(
              styles.Description,
              grid.ColXl16,
              grid.ColOffsetXl4,
            )}
            dangerouslySetInnerHTML={{ __html: sponsor.description || '' }}
          />
          {/* eslint-enable react/no-danger */}
        </div>
      </div>
      {articles && (
        <>
          <TeaserGrid
            layout={GRID_LAYOUT_CONTENT_STAGE_FIRST}
            items={ensureTeaserInterface(articles || null)}
          />
          <Pager
            itemsCount={sponsor.nativeAdvertising?.count || 0}
            itemsPerPage={SPONSOR_PAGE_SIZE}
            currentPage={page}
            component={PAGER_TYPE_PAGE_LOADER}
          />
        </>
      )}
    </div>
  );
};

export default pure(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.sponsor || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.sponsor?.nativeAdvertising?.count || 0,
    pageSize: SPONSOR_PAGE_SIZE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) =>
      (mapProps.sponsor &&
        mapProps.sponsor.title &&
        `${mapProps.sponsor.title} ${BRAND_REPORT_LABEL.replace('-', ' ')}`) ||
      BRAND_REPORT_LABEL.replace('-', ' '),
  })(BrandReport),
);
