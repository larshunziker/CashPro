import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import socialMediaBarFactory from '../../../../../common/components/SocialMediaBar/factory';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../common/components/LinkLegacy';
import SVGIcon from '../SVGIcon';
import {
  SVG_TYPE_FOOTER_FACEBOOK,
  SVG_TYPE_FOOTER_INSTAGRAM,
  SVG_TYPE_FOOTER_LINKEDIN,
  SVG_TYPE_FOOTER_PINTEREST,
  SVG_TYPE_FOOTER_YOUTUBE,
} from '../SVGIcon/constants';
import {
  SOCIAL_MEDIA_LINK_FACEBOOK,
  SOCIAL_MEDIA_LINK_FACEBOOK_FR,
  SOCIAL_MEDIA_LINK_INSTAGRAM,
  SOCIAL_MEDIA_LINK_INSTAGRAM_FR,
  SOCIAL_MEDIA_LINK_LINKEDIN,
  SOCIAL_MEDIA_LINK_PINTEREST,
  SOCIAL_MEDIA_LINK_YOUTUBE,
} from './constants';
import styles from './styles.legacy.css';
import {
  SocialMediaBarIconProps,
  SocialMediaBarProps,
  SocialMediaItemsByProps,
} from '../../../../../common/components/SocialMediaBar/typings';

type SocialMediaBarPropsInner = SocialMediaBarProps & {
  language: string;
};

export const getSocialMediaItemsByProps: SocialMediaItemsByProps<
  SocialMediaBarPropsInner
> = ({ language }) => {
  const items = [
    {
      type: 'Facebook',
      component: <SVGIcon type={SVG_TYPE_FOOTER_FACEBOOK} />,
      link:
        language === 'fr'
          ? SOCIAL_MEDIA_LINK_FACEBOOK_FR
          : SOCIAL_MEDIA_LINK_FACEBOOK,
    },
    {
      type: 'Instagram',
      component: <SVGIcon type={SVG_TYPE_FOOTER_INSTAGRAM} />,
      link:
        language === 'fr'
          ? SOCIAL_MEDIA_LINK_INSTAGRAM_FR
          : SOCIAL_MEDIA_LINK_INSTAGRAM,
    },
  ];
  // Linkedin is only needed on the german channel. It has to be between insta and youtube
  if (language === 'de') {
    items.push({
      type: 'Linkedin',
      component: <SVGIcon type={SVG_TYPE_FOOTER_LINKEDIN} />,
      link: SOCIAL_MEDIA_LINK_LINKEDIN,
    });
    items.push({
      type: 'Pinterest',
      component: <SVGIcon type={SVG_TYPE_FOOTER_PINTEREST} />,
      link: SOCIAL_MEDIA_LINK_PINTEREST,
    });
  }
  items.push({
    type: 'Youtube',
    component: <SVGIcon type={SVG_TYPE_FOOTER_YOUTUBE} />,
    link: SOCIAL_MEDIA_LINK_YOUTUBE,
  });

  return items;
};

export const SocialMediaBarIcon = ({
  type,
  link,
  component,
}: SocialMediaBarIconProps): ReactElement => (
  <Link
    className={styles.Link}
    link={{ path: link, label: type }}
    target="_blank"
    aria-label={type}
  >
    <div className={styles.Icon}>{component}</div>
  </Link>
);

const SocialMediaBar = socialMediaBarFactory({
  socialMediaItems: getSocialMediaItemsByProps,
  SocialMediaBarIcon,
  styles: {
    Wrapper: styles.Wrapper,
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

export default connect(mapStateToProps)(SocialMediaBar);
