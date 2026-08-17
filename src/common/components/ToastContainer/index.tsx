/**
 * @file  ToastContainer
 * @desc  This is the container where all the Toasts dispatched by the toast function
 * of the react-toastify library will be rendered.
 */

import React from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './styles.legacy.css';

const ToastContainerWrapper = () => (
  <ToastContainer
    limit={1}
    position="bottom-center"
    autoClose={false}
    draggable={false}
    className={styles.ToastContainer}
    toastClassName={styles.Toast}
    bodyClassName={styles.ToastBody}
    closeButton={false}
  />
);

export default ToastContainerWrapper;
