/**
 *
 */
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import raf from 'raf';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import { searchToggle as searchToggleAction } from '../../../../../shared/actions/search';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Link from '../../../../../common/components/Link';
import Helmet from '../../components/Helmet';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'handleSearch' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'language' implicitly has an 'any' type. */
const NotFound = ({ handleSearch, language }) => {
  const dispatch = useDispatch();
  const { isSSR } = useSSRContext();

  if (isSSR) {
    dispatch(setStatusCode(404));
  }

  useEffect(() => {
    raf(() => {
      dispatch(setLoading(false));
      dispatch(
        setScreenReady(true, {
          pathname: location.pathname,
          ...getTealiumData({
            object: {
              preferredUri: location.pathname,
              __typename: 'ErrorPage',
            },
          }),
        }),
      );
    });
  }, [dispatch]);

  return (
    <div className={`page-not-found ${styles.Wrapper}`}>
      <Helmet title="Page not found" />
      <div className={sections.Container}>
        <h1 className={styles.Title}>404</h1>
        <h3 className={styles.MainTitle}>
          <FormattedMessage
            id="app.notfound.title"
            description="The title of the notfound page"
            defaultMessage="Sorry, da ist etwas schief gelaufen."
          />
        </h3>
        <p className={styles.Msg}>
          <FormattedMessage
            id="app.notfound.texttop"
            description="The texttop of the notfound page"
            defaultMessage="Wir konnten Ihre Seite leider nicht finden."
          />
          &nbsp;
          <FormattedMessage
            id="app.notfound.textmiddle"
            description="The textmiddle of the notfound page"
            defaultMessage="Gehen Sie auf"
          />
          &nbsp;
          <Link path={language === 'fr' ? '/fr' : '/'}>
            <FormattedMessage
              id="app.notfound.home"
              description="The home link naming of the notfound page"
              defaultMessage="Home"
            />
          </Link>
          &nbsp;
          <FormattedMessage
            id="app.notfound.textor"
            description="The textor of the notfound page"
            defaultMessage="oder"
          />
          &nbsp;
          <a href="#toggleSearch" onClick={handleSearch}>
            <FormattedMessage
              id="app.notfound.search"
              description="The search translation of the notfound page"
              defaultMessage="Suche"
            />
          </a>
          &nbsp;
          <FormattedMessage
            id="app.notfound.textbottom"
            description="The textbottom of the notfound page"
            defaultMessage="um mehr über uns zu erfahren."
          />
        </p>
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
const doHandleSearch = (props) => (event) => {
  event.preventDefault();
  props.searchToggle(true);
  global.scrollTo(0, 0);
};

const withHandleSearch = withHandlers({
  handleSearch: doHandleSearch,
});

const mapDispatchToProps = {
  searchToggle: searchToggleAction,
};

export default compose<any, any>(
  connect(undefined, mapDispatchToProps),
  withHandleSearch,
)(NotFound);
