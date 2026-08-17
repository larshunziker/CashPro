import React from 'react';
import { compose } from 'redux';
import withHelmet from '../../../../shared/decorators/withHelmet';
import ExplainingArticles from '../ExplainingArticles';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import { EXPLAINING_TYPE_LEGAL_DICTIONARY } from '../././ExplainingArticles/constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const LegalDictionary = (props) => {
  return (
    <ExplainingArticles
      {...props}
      category={EXPLAINING_TYPE_LEGAL_DICTIONARY}
    />
  );
};

export default compose<any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
)(LegalDictionary);
