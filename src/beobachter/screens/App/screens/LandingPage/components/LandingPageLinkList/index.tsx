import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {
  getAllArticles,
  getRestrictedClassName,
} from '../../../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import EditButtons from '../../../../components/EditButtons';
import TextLinklist from './components/TextLinkList';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../../../components/Pager';
import StatusPage from '../../../StatusPage';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { LANDING_PAGE_GRID_PAGE_SIZE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps & {
  routeVertical: string;
  routePathname: string;
};

export const LANDINGPAGE_TYPE_LINKS = 'links';

const PAGER_ANCHOR_SCROLL_ID = 'page';

const LandingPageLinkList = ({ landingPage, page }: LandingPagePropsInner) => {
  if (page !== 1 && !landingPage.grid) {
    return <StatusPage />;
  }
  return (
    <div className={`landing-page text-link-list ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage?.cloneContentUri}
      />

      <div className={styles.Container}>
        <div className={grid.Row}>
          <div className={classNames(grid.ColSm22, grid.ColOffsetSm1)}>
            <div className={styles.Header}>
              Weitere Artikel
              {landingPage.title && ' zum '}
              <span className={styles.HeaderTitle}>
                {landingPage.title || ''}
              </span>
            </div>
          </div>

          <div className={grid.ColXs24}>
            <div className={styles.Divider} />
          </div>

          <div
            className={classNames(
              grid.ColXl22,
              grid.ColOffsetXl1,
              getRestrictedClassName(landingPage.__typename),
            )}
          >
            {landingPage.grid && (
              <div id={PAGER_ANCHOR_SCROLL_ID}>
                <div className={styles.Wrapper}>
                  <TextLinklist items={landingPage.grid || null} />
                </div>
                <div>
                  <Pager
                    itemsCount={landingPage?.grid?.count || 0}
                    itemsPerPage={LANDING_PAGE_GRID_PAGE_SIZE}
                    currentPage={page}
                    component={PAGER_TYPE_PAGE_LOADER}
                    anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withHelmet({
    getNode: (mapProps: LandingPagePropsInner) => mapProps.landingPage || null,
    getNodesCount: (mapProps: LandingPagePropsInner) =>
      mapProps?.landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: LandingPagePropsInner) =>
      getAllArticles(mapProps.landingPage),
  }),
)(LandingPageLinkList);
