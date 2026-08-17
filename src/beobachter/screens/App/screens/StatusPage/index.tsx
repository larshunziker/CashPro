/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import statusPageFactory from './../../../../../common/screens/StatusPage/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from './../../components/Helmet';
import SVGIcon from './../../components/SVGIcon';
import SearchForm from './../../components/Search/components/SearchForm';
import {
  SVG_ICONS_TYPE_BEO_404,
  SVG_ICONS_TYPE_BEO_451,
  SVG_ICONS_TYPE_BEO_500,
} from './../../components/SVGIcon/constants';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { StatusCodeConfig } from './../../../../../common/screens/StatusPage/typings';

const statusCodeConfig: StatusCodeConfig = {
  404: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_BEO_404} className={styles.Icon} />,
    title: { text: 'Seite nicht gefunden' },
    description: {
      text:
        'Möglicherweise ist die URL falsch oder die Seite wurde entfernt.\n' +
        'Es könnte sein, dass Sie ein Lesezeichen für eine Seite gesetzt haben, die inzwischen verschoben wurde.',
    },
    metaTitle: 'Seite nicht gefunden',
  },
  451: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_BEO_451} className={styles.Icon} />,
    title: { text: 'Dieser Artikel ist in Ihrem Land nicht verfügbar' },
    description: {
      text: 'Der Artikel ist aus rechtlichen Gründen an Ihrem Standort nicht verfügbar. Wir bitten um Verständnis.',
    },
    metaTitle: 'Dieser Artikel ist in Ihrem Land nicht verfügbar',
    showSearchForm: false,
  },
  503: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_BEO_500} className={styles.Icon} />,
    title: { text: 'System nicht erreichbar' },
    description: {
      text: 'Leider sind unsere Systeme zur Zeit nicht erreichbar. Bitte versuchen Sie es später noch einmal.',
    },
    metaTitle: 'System Fehler',
  },
};

const StatusPage = statusPageFactory({
  statusCodeConfig,
  searchForm: (
    <SearchForm
      ignoreDefaultClass
      addClass={classNames(styles.SearchForm, styles.WrapperGrey)}
      placeholder="Suchbegriff eingeben"
      searchButtonClass={styles.StatusPageSearchButton}
      searchButtonText="Suchen"
      shouldShowSearchIcon={false}
      searchInputClass={styles.StatusPageSearchInput}
      searchInputWrapperClass={styles.StatusPageSearchInputWrapper}
      resetButtonClass={styles.StatusPageResetButton}
      resetButtonIconClass={styles.StatusPageResetButtonIcon}
      autocompleteWrapperClass={styles.StatusPageAutocompleteWrapper}
    />
  ),
  Helmet,
  styles: {
    Wrapper: styles.Wrapper,
    Container: styles.Container,
    Row: classNames(styles.Row, grid.ColXs24, grid.ColXl16, grid.ColOffsetXl4),
    Columns: styles.Columns,
    HeaderWrapper: styles.HeaderWrapper,
    IconWrapper: styles.IconWrapper,
    Icon: styles.Icon,
    Title: styles.Title,
    Description: styles.Description,
    SearchWrapper: styles.SearchWrapper,
  },
  setLoading,
  setScreenReady,
});

export default StatusPage;
