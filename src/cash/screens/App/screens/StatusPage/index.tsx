/* istanbul ignore file */

import React from 'react';
import statusPageFactory from './../../../../../common/screens/StatusPage/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from './../../components/Helmet';
import SVGIcon from './../../components/SVGIcon';
import {
  SVG_ICONS_TYPE_CASH_404,
  SVG_ICONS_TYPE_CASH_451,
} from './../../components/SVGIcon/constants';
import styles from './styles.legacy.css';
import { StatusCodeConfig } from './../../../../../common/screens/StatusPage/typings';

const statusCodeConfig: StatusCodeConfig = {
  404: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_CASH_404} className={styles.Icon} />,
    title: { text: 'Seite nicht gefunden' },
    description: {
      text: 'Die von Ihnen gesuchte Seite existiert leider nicht. Suchen Sie den gewünschten Inhalt über unsere Suche.',
    },
    metaTitle: 'Seite nicht gefunden',
  },
  503: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_CASH_404} className={styles.Icon} />,
    title: { text: 'System nicht erreichbar' },
    description: {
      text: 'Leider sind unsere Systeme zur Zeit nicht erreichbar. Bitte versuchen Sie es später noch einmal.',
    },
    metaTitle: 'System Fehler',
  },
  451: {
    icon: <SVGIcon type={SVG_ICONS_TYPE_CASH_451} className={styles.Icon} />,
    title: { text: 'Dieser Artikel ist in Ihrem Land nicht verfügbar' },
    description: {
      text: 'Der Artikel ist aus rechtlichen Gründen an Ihrem Standort nicht verfügbar. Wir bitten um Verständnis.',
      className: styles.Description451,
    },
    metaTitle: 'Dieser Artikel ist in Ihrem Land nicht verfügbar',
    showSearchForm: false,
  },
};

const StatusPage = statusPageFactory({
  statusCodeConfig,
  Helmet,
  styles: {
    Wrapper: styles.Wrapper,
    Container: styles.Container,
    Row: styles.Row,
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
