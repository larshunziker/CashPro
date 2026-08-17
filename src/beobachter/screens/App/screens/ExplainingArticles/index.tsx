import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect } from 'react-redux';

import { branch, compose, renderComponent } from 'recompose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { getScrollOffset } from '../../../../shared/helpers/getScrollOffset';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import TermsOverview from '../../components/TermsOverview';
import StatusPage from '../StatusPage';
import EntriesList from './components/ExplainingList';
import ScrollToTop, {
  ANCHOR_TAG_SCROLL_TO_TOP,
} from '../../components/ScrollToTop';
import { MMR_1 } from '../../../../../shared/constants/adZone';
import { CHARS_WHITELIST, EXPLAINING_TYPE_LEGAL_DICTIONARY } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import fallbackImage from '../../../App/assets/graphics/beobachter-fb-fallback.jpg';
import { ExplainingProps } from './typings';

type OnmedaPropsInner = ExplainingProps & {
  data: ApolloData & {
    environment: {
      content: SearchableUnionGraphList;
      globalSearch: SearchableUnionGraphList;
    };
  };
  setStatusCode: typeof setStatusCode;
  viewportLabel?: string;
  noHeader?: boolean;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'environment' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'setStatusCode' implicitly has an 'any' type. */
export const renderEntriesList = (environment, setStatusCode) => {
  const explainingByChar = environment?.onmedaByChar || null;

  if (!explainingByChar) {
    if (__SERVER__) {
      setStatusCode(404);
    }

    return <div>Keine Artikel zu diesem Buchstaben vorhanden</div>;
  }

  if (__SERVER__) {
    setStatusCode(200);
  }

  return (
    <TestFragment data-testid="onmeda-entrieslist-wrapper">
      <EntriesList list={explainingByChar} />
    </TestFragment>
  );
};

const ExplainingArticles = ({
  data,
  setStatusCode,
  char = 'A',
  category = EXPLAINING_TYPE_LEGAL_DICTIONARY,
  viewportLabel,
  noHeader,
}: OnmedaPropsInner) => {
  const environment = data?.environment;

  const lettersUrl = '/rechtslexikon/list';

  const scrollOffset = getScrollOffset(false, viewportLabel, noHeader);

  const breadcrumbItems = {
    edges: [
      {
        node: {
          id: 'rechts-lexicon-uuid',
          link: lettersUrl,
          label: 'Rechtslexikon',
        },
      },
    ],
  };

  return (
    <TestFragment data-testid="onmeda-wrapper">
      <BodyClassName className={styles.ArticleBody}>
        <div className={styles.Wrapper}>
          <SmoothScroll
            anchorId={ANCHOR_TAG_SCROLL_TO_TOP}
            offset={scrollOffset}
          />
          <TermsOverview
            activeLetter={char}
            lettersUrl={lettersUrl}
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            breadcrumbItems={breadcrumbItems}
          />
          <div
            className={classNames(
              'ad-wrapper ad-wrapper-mobile',
              sections.SectionGrayLightest,
            )}
          >
            <AppNexus slot={MMR_1} deviceType="mobile" />
          </div>
          <div className={styles.Container}>
            <div className={grid.Row}>
              <div className={classNames(grid.ColMd16, grid.ColOffsetMd4)}>
                {renderEntriesList(environment, setStatusCode)}
              </div>
            </div>
            <ScrollToTop />
          </div>
        </div>
      </BodyClassName>
    </TestFragment>
  );
};

const mapDispatchToProps = {
  setStatusCode,
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  noHeader: headerStateSelector(state).noHeader,
});

const withStoreConnection = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) =>
    typeof props !== 'object' ||
    !props ||
    (props.char && !CHARS_WHITELIST.includes(props.char)) ||
    (props.category &&
      props.category.toLowerCase() !== EXPLAINING_TYPE_LEGAL_DICTIONARY),
  renderComponent(StatusPage),
  renderComponent(ExplainingArticles),
);

export default compose<any, any>(
  withParams,
  withStoreConnection,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => ({
      title: `Alle Rechtsartikel mit ${mapProps.char}`,
    }),
    getImage: () => ({
      relativeOriginPath: fallbackImage,
    }),
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
      }),
  }),
  withBranch,
)(ExplainingArticles);
