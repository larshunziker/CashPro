import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import classNames from 'classnames';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setIsSinglePage } from '../../../../shared/actions/header';
import EditButtons from '../../components/EditButtons';
import MonsterSky from '../../components/MonsterSky';
import Paragraphs from '../../components/Paragraphs';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenProps } from './typings';

export const PAGE_TYPE = 'page';

export const pageColStyle = classNames(
  grid.ColSm22,
  grid.ColMd14,
  grid.ColOffsetSm1,
  grid.ColOffsetMd5,
);

export const leadColStyle = classNames(
  grid.ColXs22,
  grid.ColSm16,
  grid.ColOffsetXs1,
  grid.ColOffsetSm4,
);

export const pageScreenColLeadStyle = grid.ColXs24;

export const pageScreenColStyle = classNames(grid.ColMd18, grid.ColXl17);

const PageScreen = ({ pageScreen }: PageScreenProps) => (
  <div className={`page ${styles.Wrapper}`}>
    <EditButtons
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
      editContentUri={pageScreen?.editContentUri}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      editRelationUri={pageScreen?.editRelationUri}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      cloneContentUri={pageScreen?.cloneContentUri}
    />

    <MonsterSky offset={{ top: 20 }} />

    <div className={sections.Section}>
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={leadColStyle}>
            <h1 className={styles.SubTitle}>{pageScreen.title || ''}</h1>
            <div className={styles.Lead}>{pageScreen.lead || ''}</div>
          </div>
        </div>
      </div>
    </div>

    <Paragraphs
      pageBody={pageScreen.body}
      colStyle={pageColStyle}
      origin={PAGE_TYPE}
    />
  </div>
);

const mapDispatchToProps = {
  setIsSinglePage,
};

const withLifecycle = lifecycle<any, any>({
  componentDidMount() {
    this.props.setIsSinglePage(
      this.props?.pageScreen?.pageType === 'marketing',
    );
  },
  componentWillUnmount() {
    this.props.setIsSinglePage(false);
  },
});

const PageScreenWrapper = compose<any, any>(
  connect(null, mapDispatchToProps),
  withLifecycle,
  withHelmet({
    /* @ts-ignore TODO: TS7031 ->  Binding element 'pageScreen' implicitly has an 'any' type. */
    getNode: ({ pageScreen }) => pageScreen,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    hasBreadcrumbs: () => false,
  }),
)(PageScreen);

export default PageScreenWrapper;
