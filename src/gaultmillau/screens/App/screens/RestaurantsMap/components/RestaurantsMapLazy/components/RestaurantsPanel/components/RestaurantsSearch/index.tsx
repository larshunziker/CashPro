import React, { FormEvent } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { compose, withHandlers } from 'recompose';
import settingsStateSelector from '../../../../../../../../../../shared/selectors/settingsStateSelector';
import withNavigate from '../../../../../../../../../../../shared/decorators/withNavigate';
import styles from './styles.legacy.css';
import { HandleSubmitProps, RestaurantsSearchProps } from './typings';

const msgs = defineMessages({
  searchPlaceholder: {
    id: 'app.map.search.placeholder',
    description: "The search input's placeholder text in the RestaurantsFilter",
    defaultMessage: 'Suche: Ort',
  },
});

type RestaurantsSearchInnerProps = RestaurantsSearchProps & {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  handleChange: (props) => JSX.Element;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const RestaurantsSearch = ({
  handleChange,
  handleSubmit,
  intl,
  query,
}: RestaurantsSearchInnerProps) => (
  <form onSubmit={handleSubmit}>
    <input
      className={styles.Search}
      onChange={handleChange}
      placeholder={intl.formatMessage(msgs.searchPlaceholder)}
      value={query}
    />
  </form>
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const extendWithHandlers = withHandlers({
  handleChange:
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setQuery' implicitly has an 'any' type. */


      ({ setQuery }) =>
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        setQuery(event.target.value);
        event.preventDefault();
      },
  handleSubmit:
    ({ query, language, navigate }: HandleSubmitProps) =>
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    (event) => {
      const prefix = language === 'fr' ? 'fr/map' : 'map';
      navigate(`/${prefix}${query && `/${query}`}`);
      event.preventDefault();
    },
});

export default compose<any, any>(
  withNavigate,
  connect(mapStateToProps),
  extendWithHandlers,
  injectIntl,
)(RestaurantsSearch);
