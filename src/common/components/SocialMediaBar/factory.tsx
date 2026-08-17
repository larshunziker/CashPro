import React from 'react';
import {
  SocialMediaBarFactoryOptions,
  SocialMediaBarFactoryOptionsStyles,
  SocialMediaBarIconProps,
  SocialMediaBarProps,
} from './typings';

const defaultStyles: SocialMediaBarFactoryOptionsStyles = {
  Wrapper: '',
  LinkItem: '',
};

const SocialMediaBarFactory = ({
  socialMediaItems: appSocialMediaItems,
  SocialMediaBarIcon,
  styles: appStyles,
}: SocialMediaBarFactoryOptions<SocialMediaBarProps>) => {
  const SocialMediaBar = (props: SocialMediaBarProps) => {
    const socialMediaItems: SocialMediaBarIconProps[] =
      (typeof appSocialMediaItems === 'function' &&
        appSocialMediaItems(props)) ||
      (Array.isArray(appSocialMediaItems) && appSocialMediaItems) ||
      [];

    if (socialMediaItems.length === 0) {
      return null;
    }

    const styles: SocialMediaBarFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <ul className={styles.Wrapper}>
        {socialMediaItems.map((icon) => {
          return (
            <li
              className={styles.LinkItem}
              key={`social-bar-icon-${icon.type}`}
            >
              <SocialMediaBarIcon
                type={icon.type}
                link={icon.link}
                component={icon.component}
                isDark={!!props.isDark}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return SocialMediaBar;
};

export default SocialMediaBarFactory;
