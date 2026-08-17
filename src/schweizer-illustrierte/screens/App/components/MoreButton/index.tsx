import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { MORE_BUTTON_COLLAPSED, MORE_BUTTON_EXPANDED } from './constants';
import styles from './styles.legacy.css';
import { MoreButtonProps } from './typings';

export type MoreButtonPropsInner = MoreButtonProps;

const MoreButton = ({
  children,
  isLoading,
  onClick,
  type = MORE_BUTTON_COLLAPSED,
}: MoreButtonPropsInner): ReactElement => {
  return (
    <div data-testid="more-button-wrapper">
      <button
        className={classNames(styles.MoreButton, {
          [styles.Collapsed]: type === MORE_BUTTON_COLLAPSED,
          [styles.Expanded]: type === MORE_BUTTON_EXPANDED,
        })}
        onClick={() => {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          onClick();
        }}
        aria-label="Mehr laden"
      >
        {isLoading ? (
          <div
            className={styles.Loader}
            data-testid="more-button-loader-wrapper"
          />
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default MoreButton;
