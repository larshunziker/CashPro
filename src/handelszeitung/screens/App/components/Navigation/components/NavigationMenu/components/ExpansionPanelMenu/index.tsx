import React, { ReactElement } from 'react';
import classNames from 'classnames';
import expansionPanelFactory from '../../../../../../../../../common/components/ExpansionPanel/factory';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import SocialMediaBarHZ from '../../../../../SocialMediaBar/components/SocialMediaBarHZ';
import { SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION } from '../../../../../SocialMediaBar/constants';
import {
  EXPANSION_PANEL_TYPE_BIL,
  EXPANSION_PANEL_TYPE_HZ,
  EXPANSION_PANEL_TYPE_SV,
} from './constants';
import grid from './../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import logoBil from '../../../../../../assets/graphics/bilanz-logo-white.svg';
import logoHZ from '../../../../../../assets/graphics/hz-logo-white.svg';
import logoInsurance from '../../../../../../assets/graphics/hz_insurance_logo_white.svg';
import { ExpansionPanelProps } from '../../../../../../../../../common/components/ExpansionPanel/typings';
import { ExpansionPanelMenuPublicationProps } from './typings';

type ExpansionPanelSocialMediaBarProps = {
  type: string;
};

type ExpansionPanelLogoProps = {
  publication: ExpansionPanelMenuPublicationProps;
};

export const getPublicationData = (
  type: string,
): ExpansionPanelMenuPublicationProps => {
  switch (type) {
    case EXPANSION_PANEL_TYPE_BIL:
      return { src: logoBil, alt: 'Bilanz', className: styles.LogoBIL };
    case EXPANSION_PANEL_TYPE_SV:
      return {
        src: logoInsurance,
        alt: 'Handelszeitung Insurance',
        className: styles.LogoInsurance,
      };
    case EXPANSION_PANEL_TYPE_HZ:
    default:
      return { src: logoHZ, alt: 'Handelszeitung', className: '' };
  }
};

export const ExpansionPanelSocialMediaBar = ({
  type,
}: ExpansionPanelSocialMediaBarProps): ReactElement | null => {
  switch (type) {
    case EXPANSION_PANEL_TYPE_HZ:
      return (
        <TestFragment data-testid="expansion-panel-socialmedia-bar-hz">
          <SocialMediaBarHZ origin={SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION} />
        </TestFragment>
      );
    default:
      return null;
  }
};

export const ExpansionPanelLogo = ({
  publication,
}: ExpansionPanelLogoProps): ReactElement | null => {
  if (!publication?.src) {
    return null;
  }

  const { src, alt, className }: ExpansionPanelMenuPublicationProps =
    publication;

  return (
    <img
      className={classNames(styles.Logo, className)}
      src={src}
      alt={alt || 'Logo der Publikation'}
    />
  );
};

export const getHeaderByProps = ({ type }: ExpansionPanelProps) => {
  return (
    <div data-testid="expansion-panel-header">
      <div className={styles.LogoWrapper}>
        {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */}
        <ExpansionPanelLogo publication={getPublicationData(type)} />
      </div>
      <div className={styles.SocialBarWrapper}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */}
        <ExpansionPanelSocialMediaBar type={type} />
      </div>
    </div>
  );
};

export default expansionPanelFactory({
  header: getHeaderByProps,
  styles: {
    ExpansionPanel: styles.ExpansionPanel,
    IsOpen: styles.IsOpen,
    Header: styles.Header,
    HeaderContentWrapper: classNames(
      grid.Container,
      styles.HeaderContentWrapper,
    ),
    Title: '',
    BoldTitle: '',
    Spacer: '',
    Icon: styles.Icon,
    ArrowIcon: styles.ArrowIcon,
    Content: styles.Content,
  },
});
