import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import searchStateSelector from '../../../../../shared/selectors/searchStateSelector';
import { searchToggle } from '../../../../../shared/actions/search';
import Icon from '../Icon';
import ModalOverlay from '../ModalOverlay';
import SearchForm from '../SearchForm';
import { SEARCH_MODAL_OVERLAY } from '../ModalOverlay/constants';
import { SEARCH_FORM_THEME_WHITE } from '../SearchForm/constants';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'visibleSearch' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'searchToggle' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'handleSearchClose' implicitly has an 'any' type. */
const SearchOverlay = ({ visibleSearch, searchToggle, handleSearchClose }) => {
  if (!visibleSearch) {
    return null;
  }

  const menuCloseHandler = () => {
    searchToggle(false);
  };

  return (
    <ModalOverlay component={SEARCH_MODAL_OVERLAY} isVisible={visibleSearch}>
      <>
        <a
          onClick={handleSearchClose}
          className={styles.CloseLink}
          href="#close-search"
        >
          <Icon type="IconXMark" addClass={styles.Icon} />
        </a>
        <div className={grid.Container}>
          <SearchForm
            menuCloseHandler={menuCloseHandler}
            placeholder="Tippen, um zu suchen"
            theme={SEARCH_FORM_THEME_WHITE}
            focusOnMount
            focusOnMountDelay={300}
          />
        </div>
      </>
    </ModalOverlay>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  visibleSearch: searchStateSelector(state).visible,
});

const mapDispatchToProps = {
  searchToggle,
};

const extendWithHandlers = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  handleSearchClose: (props: any) => (event) => {
    event.preventDefault();
    props.searchToggle(false);
  },
});

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  extendWithHandlers,
)(SearchOverlay);
