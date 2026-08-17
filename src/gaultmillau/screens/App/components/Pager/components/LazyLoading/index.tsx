import React, { ReactElement } from 'react';
import styles from './styles.legacy.css';
import { LazyLoadingProps } from './typings';

type LazyLoadingPropsInner = LazyLoadingProps;

const LazyLoading = (props: LazyLoadingPropsInner): ReactElement =>
  /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  props.hasMoreResults && (
    <button
      /* @ts-ignore TODO: TS2322 ->  Type '((event */
      onClick={!props.IsLoading ? props.loadMore : null}
      className={props.className || `lazy-Loading-btn ${styles.LoadMore}`}
    >
      {props.children || <span>Mehr Stichworte laden</span>}
    </button>
  );

export default LazyLoading;
