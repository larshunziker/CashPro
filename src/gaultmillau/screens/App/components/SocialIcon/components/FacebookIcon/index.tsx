import React from 'react';
import { SocialIconProps } from '../../typings';

const FacebookIcon = ({
  className,
  classNameGradient,
  classNameGradientInner,
  id,
}: Omit<SocialIconProps, 'type'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    className={className}
  >
    <g fill={`url(#${id})`} className={classNameGradient}>
      <g className={classNameGradientInner}>
        <path d="M10.923 0C4.9 0 0 4.9 0 10.923s4.9 10.924 10.923 10.924 10.924-4.9 10.924-10.924C21.847 4.9 16.947 0 10.923 0zm2.717 11.308h-1.777v6.334H9.23v-6.334H7.977v-2.24h1.25V7.622c0-1.036.494-2.656 2.66-2.656l1.95.007v2.174h-1.416c-.23 0-.558.116-.558.61V9.07h2.006l-.23 2.238z" />
      </g>
    </g>
  </svg>
);

export default FacebookIcon;
