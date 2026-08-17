import React, { ComponentType } from 'react';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { SubmitButtonProps } from './typings';

const SubmitButton: ComponentType<SubmitButtonProps> = ({
  children,
  loading,
}) => (
  <div className={styles.SubmitButtonWrapper}>
    <ButtonWithLoading
      mobileFullWidth
      ariaLabel="bestätigen"
      type="submit"
      loading={loading}
    >
      <span>{children}</span>
    </ButtonWithLoading>
  </div>
);

export default SubmitButton;
