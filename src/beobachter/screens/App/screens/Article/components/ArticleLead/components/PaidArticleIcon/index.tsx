import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import Img from '../../../../../../components/Img';
import { RESTRICTION_STATUS_PAID } from './../../../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
// @ts-ignore
import beobachterPlus from 'graphics/bePlus.svg';
import { PaidArticleIconProps } from './typings';

const PaidArticleIcon = ({ restrictionStatus }: PaidArticleIconProps) => {
  if (restrictionStatus !== RESTRICTION_STATUS_PAID) {
    return null;
  }

  return (
    <Link path="abonnieren">
      <Img
        addClass={styles.PaidArticleIcon}
        alt="Beobachter Plus"
        url={beobachterPlus}
        width={26}
        height={13}
        ignoreLandscapeClass
      />
    </Link>
  );
};

export default PaidArticleIcon;
