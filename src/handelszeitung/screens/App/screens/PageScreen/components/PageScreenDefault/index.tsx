import React from 'react';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import { PAGESCREEN_DEFAULT_TYPE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenDefaultProps } from './typings';

type PageScreenPropsInner = PageScreenDefaultProps;

const PageScreenDefault = ({ pageScreen }: PageScreenPropsInner) => (
  <div className={`page-screen-default ${styles.Wrapper}`}>
    <EditButtons
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
      editContentUri={pageScreen.editContentUri}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      editRelationUri={pageScreen.editRelationUri}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      cloneContentUri={pageScreen.cloneContentUri}
    />

    <div className={sections.Section}>
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <Breadcrumbs
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              pageUrl={pageScreen.preferredUri}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
              items={pageScreen.activeMenuTrail}
            />
            {pageScreen.title && (
              <h1 itemProp="headline">
                <div className={styles.Title}>{pageScreen.title}</div>
              </h1>
            )}
          </div>
        </div>
      </div>
      {pageScreen.lead && (
        <div className={sections.Container}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <p className={styles.Lead}>{pageScreen.lead}</p>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className={getRestrictedClassName(pageScreen.__typename)}>
      <Paragraphs
        pageBody={enrichOverviewBodyWithADs({
          pageBody: pageScreen?.body,
          hasEQsWithMMR: true,
        })}
        colStyle={classNames(grid.ColMd18, grid.ColXl17)}
        origin={PAGESCREEN_DEFAULT_TYPE}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
        isAdSuppressed={pageScreen?.channel?.suppressAds}
      />
    </div>
  </div>
);

export default PageScreenDefault;
