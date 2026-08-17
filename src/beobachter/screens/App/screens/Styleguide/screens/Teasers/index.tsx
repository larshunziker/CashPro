/* istanbul ignore file */

import React, { ReactElement } from 'react';
import styleguideFactory from '../../../../../../../common/screens/Styleguide/components/Default/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import StatusPage from '../../../StatusPage';
import BreadcrumbsProvider from '../../../../../../../common/components/BreadcrumbsProvider';
import TeaserAuthor from '../../../../components/Teaser/components/TeaserAuthor';
import authorMockData from '../../../../../../../common/components/Teaser/components/Author/mockData.json';
import teaserMockData from '../../../../components/Teaser/__tests__/mockData.json';
import Teaser from '../../../../components/Teaser';
import {
  TEASER_LAYOUT_CHANNEL,
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_HERO_MAIN,
  TEASER_LAYOUT_HERO_NEW,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_MD,
  TEASER_LAYOUT_MD_COLUMN,
  TEASER_LAYOUT_RECOMMENDATIONS,
  TEASER_LAYOUT_SM,
  TEASER_LAYOUT_SHOP_PRODUCT,
  TEASER_LAYOUT_SPONSOR,
  TEASER_LAYOUT_TEXT_CONTENT_BOX,
  TEASER_LAYOUT_VIDEO,
  TEASER_LAYOUT_WIDE,
} from '../../../../../../../shared/constants/teaser';
import { ARTICLE_TYPE_OPINION } from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import { BreadcrumbsItems } from '../../../../../../../common/components/Breadcrumbs/typings';
import { TeaserProps } from '../../../../components/Teaser/typings';

const teaserLayouts = [
  TEASER_LAYOUT_CHANNEL,
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_HERO_MAIN,
  TEASER_LAYOUT_HERO_NEW,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_MD,
  TEASER_LAYOUT_MD_COLUMN,
  TEASER_LAYOUT_RECOMMENDATIONS,
  TEASER_LAYOUT_SM,
  TEASER_LAYOUT_SHOP_PRODUCT,
  TEASER_LAYOUT_SPONSOR,
  TEASER_LAYOUT_TEXT_CONTENT_BOX,
  TEASER_LAYOUT_VIDEO,
  TEASER_LAYOUT_WIDE,
];
const StyleguideComponents = (): ReactElement => {
  return (
    <>
      <h2 className="component-AuthorTeasers">AuthorTeasers</h2>
      <div className="component-AuthorTeasers">
        <TeaserAuthor author={{ ...(authorMockData as Author) }} />
        <TeaserAuthor
          author={{ ...(authorMockData as Author) }}
          isSmallColumn
        />
      </div>
      {teaserLayouts.map((layout) => {
        return (
          <>
            <h2 className="component-Teaser">Teaser {layout}</h2>
            <div className="component-Teaser">
              <Teaser
                /* @ts-ignore TODO: TS2783 ->  'component' is specified more than once, so this usage will be overwritten. */
                component={layout}
                {...(teaserMockData as unknown as TeaserProps)}
              />
              <Teaser
                /* @ts-ignore TODO: TS2783 ->  'component' is specified more than once, so this usage will be overwritten. */
                component={layout}
                {...({
                  node: {
                    ...teaserMockData.node,
                    badgeLabel: 'label',
                    badgeColor: 'default',
                    teaserImage: {
                      ...teaserMockData.node.teaserImage,
                      format: 'portrait',
                      image: {
                        file: {
                          relativeOriginPath: '/queen_in_sonnengelb.jpg',
                          focalPointX: 524,
                          focalPointY: 274,
                        },
                      },
                    },
                  },
                } as unknown as TeaserProps)}
              />
              <Teaser
                /* @ts-ignore TODO: TS2783 ->  'component' is specified more than once, so this usage will be overwritten. */
                component={layout}
                {...({
                  node: {
                    ...teaserMockData.node,
                    subtypeValue: ARTICLE_TYPE_OPINION,
                  },
                } as unknown as TeaserProps)}
              />
            </div>
          </>
        );
      })}
    </>
  );
};

const breadcrumbItems: BreadcrumbsItems = {
  edges: [
    {
      node: {
        label: 'Styleguide',
        link: '/styleguide',
      },
    },
    {
      node: {
        label: 'Teasers',
        link: null,
      },
    },
  ],
};

const Styleguide = styleguideFactory({
  breadcrumbs: (
    <BreadcrumbsProvider pageUrl={'teasers'} items={breadcrumbItems} />
  ),
  StatusPage,
  StyleguideComponents,
  title: 'Teasers',
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
  },
  setLoading,
  setScreenReady,
});

export default Styleguide;
