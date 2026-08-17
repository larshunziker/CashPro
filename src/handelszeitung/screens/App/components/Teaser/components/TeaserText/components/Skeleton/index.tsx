import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { SkeletonThemeProps } from '../../../../../../../../../common/components/ContentBox/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.GreyC];

type SkletonProps = {
  theme?: SkeletonThemeProps;
};

const LoadingSkeleton = ({ theme }: SkletonProps) => {
  return (
    <div
      className={classNames(styles.SkeletonWrapper, {
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        [styles[theme]]: !!theme,
      })}
    >
      <div
        className={classNames(styles.SkeletonLeft, {
          /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          [styles[theme]]: !!theme,
        })}
      ></div>
      <div
        className={classNames(styles.SkeletonRight, {
          /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          [styles[theme]]: !!theme,
        })}
      ></div>
      <div
        className={classNames(styles.SkeletonContent, {
          /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          [styles[theme]]: !!theme,
        })}
      ></div>
      <div
        className={classNames(styles.SkeletonContent, {
          /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          [styles[theme]]: !!theme,
        })}
      ></div>
      <div
        className={classNames(styles.SkeletonContent, {
          /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          [styles[theme]]: !!theme,
        })}
      ></div>
    </div>
  );
};

const Skeleton = ({ ...props }: SkletonProps) => {
  return (
    <>
      <LoadingSkeleton {...props} />
      <LoadingSkeleton {...props} />
      <LoadingSkeleton {...props} />
      <LoadingSkeleton {...props} />
      <LoadingSkeleton {...props} />
    </>
  );
};

export default Skeleton;
