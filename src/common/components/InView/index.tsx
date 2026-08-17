/**
 * @file   in view
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2019-03-11
 */

// TODO: add unit tests

import React, { ReactElement, ReactNode } from 'react';
import useInView, {
  UseInViewConfig,
  UseInViewResponse,
} from '../../../shared/hooks/useInView';
import styles from './styles.legacy.css';

type UseInViewRenderProps = {
  isInView: boolean;
  entry: IntersectionObserverEntry | null;
};

type InViewPropsInner = {
  config: UseInViewConfig;
  children(props: UseInViewRenderProps): ReactNode;
  isObserveDelayed?: boolean;
  isInitialInView?: boolean;
  reInitOnViewportLabelChange?: boolean;
  reInitOnLocationChange?: boolean;
};

const InView = ({
  config = {},
  children,
  isObserveDelayed,
  isInitialInView = false,
  reInitOnViewportLabelChange = false,
  reInitOnLocationChange = false,
}: InViewPropsInner): ReactElement => {
  const { setRef, isInView, entry }: UseInViewResponse = useInView(
    config,
    isObserveDelayed,
    isInitialInView,
    reInitOnViewportLabelChange,
    reInitOnLocationChange,
  );

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div className={`${styles.Wrapper} is-in-view`} ref={setRef}>
      {children({
        isInView,
        entry,
      })}
    </div>
  );
};

export default InView;
