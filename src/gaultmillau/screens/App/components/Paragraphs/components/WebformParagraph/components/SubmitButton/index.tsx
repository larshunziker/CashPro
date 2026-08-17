import React, { ComponentType } from 'react';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { SubmitButtonProps } from './typings';

const SubmitButton: ComponentType<SubmitButtonProps> = ({
  children,
  loading,
}) => (
  <div className={styles.SubmitButtonWrapper}>
    <ButtonWithLoading ariaLabel={'bestätigen'} loading={loading}>
      {children}
    </ButtonWithLoading>
  </div>
);

export default SubmitButton;
