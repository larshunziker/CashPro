import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import asideFactory from '../../../../../../../../../common/screens/PageTemplate/components/Aside/factory';
import AsideMostRead from '../../../../../../components/AsideMostRead';
import scrollStateSelector from '../../../../../../../../../shared/selectors/scrollStateSelector';
import { PIANO_CONTAINER_ARTICLE_ASIDE } from '../../../../../../../../../shared/constants/piano';
import styles from './styles.legacy.css';

export const GetContentByProps = () => {
  return [
    <div key="aside-element-1">
      <div
        className={classNames(
          PIANO_CONTAINER_ARTICLE_ASIDE,
          styles.PianoIntegrationWrapper,
        )}
      />
    </div>,
    <div key="aside-element-2">
      <div className={styles.MostReadBoxWrapper}>
        <AsideMostRead />
      </div>
    </div>,
  ];
};

const Aside = asideFactory({
  content: GetContentByProps,
  styles: {
    Sticky: styles.Sticky,
    Wrapper: styles.Wrapper,
    StickyOnScroll: styles.StickyOnScroll,
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  scrollDirection: scrollStateSelector(state).direction,
});

const withStoreConnection = connect(mapStateToProps);

export default compose<any>(withStoreConnection)(Aside);
