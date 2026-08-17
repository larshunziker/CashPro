import React from 'react';
import FacebookIcon from './components/FacebookIcon';
import GoogleNewsIcon from './components/GoogleNewsIcon';
import InstagramIcon from './components/InstagramIcon';
import LinkedInIcon from './components/LinkedInIcon';
import PinterestIcon from './components/PinterestIcon';
import YouTubeIcon from './components/YouTubeIcon';
import { SOCIAL_ICON } from './constants';
import { SocialIconProps } from './typings';

const SocialIcon = ({
  type,
  className,
  classNameGradient,
  classNameGradientInner,
  id,
}: SocialIconProps) => {
  const options = {
    id,
    className,
    classNameGradient,
    classNameGradientInner,
  };

  switch (type) {
    case SOCIAL_ICON.FACEBOOK:
      return <FacebookIcon {...options} />;
    case SOCIAL_ICON.INSTAGRAM:
      return <InstagramIcon {...options} />;
    case SOCIAL_ICON.YOUTUBE:
      return <YouTubeIcon {...options} />;
    case SOCIAL_ICON.LINKEDIN:
      return <LinkedInIcon {...options} />;
    case SOCIAL_ICON.PINTEREST:
      return <PinterestIcon {...options} />;
    case SOCIAL_ICON.GOOGLE_NEWS:
      return <GoogleNewsIcon {...options} />;
    default:
      return null;
  }
};

export default SocialIcon;
