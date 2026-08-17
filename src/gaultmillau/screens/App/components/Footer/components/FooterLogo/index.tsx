import React, { FC } from 'react';
import withLanguageAwareData from '../../../../../../shared/decorators/withLanguageAwareData';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import styles from './styles.legacy.css';
import footerLogo from '../../../../assets/graphics/logo.svg';

type FooterLogoInner = {
  languageAwareData: {
    path: string;
  };
};

const Logo: FC<FooterLogoInner> = ({ languageAwareData }) => (
  <RefetchGqlDataLink path={languageAwareData.path}>
    <img
      className={styles.FooterLogo}
      src={footerLogo}
      alt="Gault & Millau Logo"
    />
  </RefetchGqlDataLink>
);

export default withLanguageAwareData({
  path: {
    de: '/',
    fr: '/fr',
  },
})(Logo);
