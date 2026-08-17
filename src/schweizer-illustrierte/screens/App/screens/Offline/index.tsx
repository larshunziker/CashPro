/* istanbul ignore file */

import React from 'react';
import Helmet from './../../components/Helmet';
import Link from './../../../../../common/components/Link';
import ArrowButton from './../../components/ArrowButton';
import SVGIcon from './../../components/SVGIcon';
import offlineFactory from './../../../../../common/screens/Offline/factory';
import { SVG_ICONS_TYPE_OFFLINE } from '../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';

const Offline = offlineFactory({
  Helmet,
  styles,
  SVGIcon,
  iconType: SVG_ICONS_TYPE_OFFLINE,
  callToAction: (
    <Link path="/" className={styles.CallToAction}>
      <ArrowButton large>Wiederholen</ArrowButton>
    </Link>
  ),
});

export default Offline;
