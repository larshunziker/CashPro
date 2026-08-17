import React, { ComponentType } from 'react';
import Button from '../../../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { SubmitButtonProps } from './typings';

const SubmitButton: ComponentType<SubmitButtonProps> = ({
  children,
  loading,
}) => (
  <div className={styles.SubmitButtonWrapper}>
    <Button ariaLabel="bestätigen" type="submit" loading={loading}>
      <span>{children}</span>
    </Button>
  </div>
);

export default SubmitButton;
