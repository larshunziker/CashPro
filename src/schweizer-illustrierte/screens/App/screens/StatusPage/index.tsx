/* istanbul ignore file */

import React from 'react';
import statusPageFactory from './../../../../../common/screens/StatusPage/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from './../../components/Helmet';
import SVGIcon from './../../components/SVGIcon';
import SearchForm from './../../components/SearchForm/themes/SearchFormResultPage';
import {
  SVG_ICONS_TYPE_SI_404,
  SVG_ICONS_TYPE_SI_451,
  SVG_ICONS_TYPE_SI_500,
} from './../../components/SVGIcon/constants';
import styles from './styles.legacy.css';
import type { StatusCodeConfig } from './../../../../../common/screens/StatusPage/typings';

const statusCodeConfig: StatusCodeConfig = {
  404: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_SI_404} className={styles.Icon} />,
    title: { text: 'Hoppla! Seite nicht gefunden' },
    description: {
      text: 'Die von dir gesuchte Seite existiert leider nicht. Scrolle weiter, um die Startseite anzuzeigen, oder finde den gewünschten Inhalt über unsere Suche.',
    },
    metaTitle: 'Seite nicht gefunden',
  },
  451: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_SI_451} className={styles.Icon} />,
    title: { text: 'Dieser Artikel ist in Deinem Land nicht verfügbar' },
    description: {
      text: 'Der Artikel steht an deinem Standort nicht zur verfügung. Wir bitten um Verständnis.',
    },
    metaTitle: 'Dieser Artikel ist in Deinem Land nicht verfügbar',
    showSearchForm: false,
  },
  503: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_SI_500} className={styles.Icon} />,
    title: { text: 'System nicht erreichbar' },
    description: {
      text: 'Leider sind unsere Systeme zur Zeit nicht erreichbar. Bitte versuchen Sie es später noch einmal.',
    },
    metaTitle: 'System Fehler',
  },
};

const StatusPage = statusPageFactory({
  statusCodeConfig,
  searchForm: <SearchForm minQueryLength={2} />,
  Helmet,
  styles,
  setLoading,
  setScreenReady,
});

export default StatusPage;
