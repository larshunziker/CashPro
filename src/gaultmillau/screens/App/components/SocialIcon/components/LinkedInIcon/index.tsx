import React from 'react';
import { SocialIconProps } from '../../typings';

const LinkedInIcon = ({
  className,
  classNameGradient,
  classNameGradientInner,
  id,
}: Omit<SocialIconProps, 'type'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="4 2 24 27"
    aria-hidden="true"
    width="22"
    height="22"
    className={className}
    id={id}
  >
    <g fillRule="nonzero" className={classNameGradient}>
      <path
        className={classNameGradientInner}
        d="M16 3.021c-6.8 0-12.4 5.8-12.4 13s5.6 13 12.4 13c6.8 0 12.4-5.8 12.4-13s-5.5-13-12.4-13zM11.9 22.721h-3.2v-9.7h3.3v9.7zM10.2 11.821c-1.1 0-1.8-0.8-1.8-1.7 0-1 0.8-1.7 1.9-1.7s1.8 0.8 1.8 1.7c0 1-0.7 1.7-1.9 1.7zM23.7 22.721h-3.3v-5.2c0-1.3-0.5-2.2-1.6-2.2-0.9 0-1.4 0.6-1.7 1.2-0.1 0.3-0.1 0.5-0.1 0.8v5.4h-3.3c0-8.8 0-9.7 0-9.7h3.3v1.4c0.5-0.7 1.3-1.6 2.9-1.7 2.2 0 3.8 1.4 3.8 4.3v5.7z"
      ></path>
    </g>
  </svg>
);

export default LinkedInIcon;
