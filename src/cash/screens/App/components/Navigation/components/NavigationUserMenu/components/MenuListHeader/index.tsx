import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { EBANKING_LOGIN_LINK } from '../../../../../../constants';
import styles from './styles.legacy.css';

const MenuListHeader = () => {
  return (
    <div className={styles.MenuListHeader}>
      <Link path={EBANKING_LOGIN_LINK}>
        <ButtonWithLoading
          aria-label="E-Banking Login"
          variant="primary"
          size="big"
          mobileFullWidth
          highAttention
        >
          E-Banking Login
        </ButtonWithLoading>
      </Link>
    </div>
  );
};

export default MenuListHeader;
