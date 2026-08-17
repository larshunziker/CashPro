import React from 'react';

import { compose, pure } from 'recompose';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import TeaserGrid from '../../../../components/TeaserGrid';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_CENTER,
} from '../../../../components/SponsorImage';
import { GRID_LAYOUT_TEASER_1X18 } from '../../../../components/TeaserGrid/gridConfigs/constants';
import { SITE_TITLE } from '../../../../constants';
import { SPONSOR_DEFAULT_TYPE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import fallbackImage from '../../../../assets/graphics/beobachter-fb-fallback.jpg';
import { SponsorListProps } from './typings';

export type SponsorListPropsInner = SponsorListProps;

export const BRAND_REPORT_LABEL = 'brand-report';

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_CENTER,
});

const getDefaultTitle = (sponsorName: string, pageLabel: string) =>
  `${sponsorName} ${pageLabel.replace('-', ' ')}`;

const SponsorList = ({ sponsor }: SponsorListPropsInner) => {
  if (!sponsor) {
    return null;
  }
  const articles: Article =
    (sponsor?.nativeAdvertising?.edges &&
      Array.isArray(sponsor?.nativeAdvertising?.edges) &&
      sponsor.nativeAdvertising.edges.length > 0 &&
      ensureTeaserInterface(sponsor.nativeAdvertising.edges)) ||
    null;

  return (
    <div className={classNames(BRAND_REPORT_LABEL, styles.Wrapper)}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={sponsor.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={sponsor.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={sponsor.cloneContentUri}
      />

      <div className={styles.Container}>
        <div className={grid.Container}>
          <div className={styles.TeaserImageWrapper}>
            {sponsor && Object.keys(sponsor).length > 0 && (
              <SponsorImage sponsor={sponsor} />
            )}
          </div>
          <div className={grid.Row}>
            <div
              className={classNames(
                styles.Description,
                grid.ColXl16,
                grid.ColOffsetXl4,
              )}
              dangerouslySetInnerHTML={{ __html: sponsor?.description || '' }}
            />
          </div>
          <div className={getRestrictedClassName(sponsor.__typename)}>
            <Paragraphs
              colStyle={grid.ColXs24}
              pageBody={sponsor.body}
              origin={SPONSOR_DEFAULT_TYPE}
            />
          </div>
        </div>
      </div>

      <div className={styles.Related}>
        {articles && (
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColXs24,
                  grid.ColOffsetMd5,
                  grid.ColMd14,
                  grid.ColOffsetXl4,
                  grid.ColXl16,
                )}
              >
                <TeaserGrid
                  layout={GRID_LAYOUT_TEASER_1X18}
                  items={ensureTeaserInterface(articles)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default pure(
  compose<any, any>(
    withHelmet({
      getNode: (mapProps: SponsorListPropsInner) => ({
        title: `${getDefaultTitle(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          mapProps?.sponsor?.title,
          BRAND_REPORT_LABEL,
        )} - ${SITE_TITLE}`,
        metaDescription: getDefaultTitle(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          mapProps?.sponsor?.title,
          BRAND_REPORT_LABEL,
        ),
      }),
      getImage: () => ({
        relativeOriginPath: fallbackImage,
      }),
      getFallbackTitle: (mapProps: SponsorListPropsInner) =>
        (!!mapProps &&
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          getDefaultTitle(mapProps?.sponsor?.title, BRAND_REPORT_LABEL)) ||
        '',
    }),
  )(SponsorList),
);
