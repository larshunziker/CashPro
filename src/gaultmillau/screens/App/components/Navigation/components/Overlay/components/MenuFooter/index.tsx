import React from 'react';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../../../common/components/Link';
import SocialIcon from '../../../../../SocialIcon';
import { ShopLink } from '../../../../../Header/components/HeaderInner/components/MenuItems';
import { SOCIAL_ICON } from '../../../../../SocialIcon/constants';
import {
  SOCIAL_MEDIA_LINK_FACEBOOK,
  SOCIAL_MEDIA_LINK_FACEBOOK_FR,
  SOCIAL_MEDIA_LINK_INSTAGRAM,
  SOCIAL_MEDIA_LINK_INSTAGRAM_FR,
  SOCIAL_MEDIA_LINK_LINKEDIN,
  SOCIAL_MEDIA_LINK_PINTEREST,
  SOCIAL_MEDIA_LINK_YOUTUBE,
} from '../../../../../SocialMediaBar/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MenuFooterProps, SocialIconOptions } from './typings';

type MenuFooterPropsInner = MenuFooterProps & {
  language: string;
};

const getOptions = (id: string): SocialIconOptions => ({
  classNameGradient: styles.Gradient,
  classNameGradientInner: styles.GradientInner,
  id,
});

const MenuFooter = ({ language }: MenuFooterPropsInner) => (
  <div className={classNames(styles.MenuFooter, grid.Row)}>
    <div
      className={classNames(
        styles.MenuFooterLink,
        grid.ColSm8,
        grid.HiddenSmDown,
      )}
    >
      {language === 'de' && (
        <ShopLink
          language={language}
          isRight={false}
          {...getOptions('shop_link')}
        />
      )}
    </div>
    <div className={classNames(styles.Social, grid.ColSm16)}>
      <Link
        path={
          language === 'fr'
            ? SOCIAL_MEDIA_LINK_FACEBOOK_FR
            : SOCIAL_MEDIA_LINK_FACEBOOK
        }
        className={styles.SocialLink}
      >
        <SocialIcon
          type={SOCIAL_ICON.FACEBOOK}
          {...getOptions('Facebook_Icon')}
        />
      </Link>
      <Link
        path={
          language === 'fr'
            ? SOCIAL_MEDIA_LINK_INSTAGRAM_FR
            : SOCIAL_MEDIA_LINK_INSTAGRAM
        }
        className={styles.SocialLink}
      >
        <SocialIcon
          type={SOCIAL_ICON.INSTAGRAM}
          {...getOptions('Instagram_Icon')}
        />
      </Link>
      {language === 'de' && (
        <Link path={SOCIAL_MEDIA_LINK_LINKEDIN} className={styles.SocialLink}>
          <SocialIcon
            type={SOCIAL_ICON.LINKEDIN}
            {...getOptions('Linkedin_Icon')}
          />
        </Link>
      )}
      <Link path={SOCIAL_MEDIA_LINK_YOUTUBE} className={styles.SocialLink}>
        <SocialIcon
          type={SOCIAL_ICON.YOUTUBE}
          {...getOptions('Youtube_Icon')}
        />
      </Link>

      {language === 'de' && (
        <Link path={SOCIAL_MEDIA_LINK_PINTEREST} className={styles.SocialLink}>
          <SocialIcon
            type={SOCIAL_ICON.PINTEREST}
            {...getOptions('Pinterest_Icon')}
          />
        </Link>
      )}
    </div>
  </div>
);

export const mapStateToProps = (state: Object): Object => ({
  language: settingsStateSelector(state).language,
});

export default compose<any, any>(connect(mapStateToProps))(MenuFooter);
