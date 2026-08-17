import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { setStatusCode } from '../../../../../../../shared/actions/ssr';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'setStatusCode' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'query' implicitly has an 'any' type. */
const NothingFound = ({ setStatusCode, query }) => {
  if (__SERVER__) {
    setStatusCode(404);
  }

  return (
    <div
      className={styles.EmptyResultWrapper}
      data-testid="search-no-results-container"
    >
      <h2 className={styles.Text}>
        Leider haben wir zu &apos;{query}&apos; keine Suchresultate gefunden.
      </h2>
    </div>
  );
};

const mapDispatchToProps = {
  setStatusCode,
};

export default compose<any, any>(connect(null, mapDispatchToProps))(
  NothingFound,
);
