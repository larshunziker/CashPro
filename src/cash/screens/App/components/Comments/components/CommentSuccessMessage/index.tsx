/* istanbul ignore file */

import React from 'react';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'successMessage' implicitly has an 'any' type. */
const CommentSuccessMessage = ({ successMessage }) => (
  <div className={styles.Wrapper}>
    <div className={styles.Heading}>
      <span className={styles.Icon}>
        <Icon type="IconCheck" />
      </span>
      <h1 className={styles.Title}>Vielen Dank!</h1>
    </div>
    <p className={styles.Paragraph}>{successMessage}</p>
  </div>
);

export default CommentSuccessMessage;
