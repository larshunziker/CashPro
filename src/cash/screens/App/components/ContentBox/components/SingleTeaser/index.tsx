import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, WatchQueryFetchPolicy } from '@apollo/client';
import { ensureTeaserInterfaceItem } from '../../../Teaser/shared/helpers';
import Teaser from '../../../Teaser';
import { NATIVE_ADVERTISING_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../../../shared/constants/globalSearch';
import { TEASER_LAYOUT_M } from '../../../../../../../shared/constants/teaser';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { LATEST_NATIVE_ADVERTISING_BY_VALOR_QUERY } from './queries';

type SingleTeaserQuery = ApolloData & {
  environment: {
    content: SearchableUnionGraphList;
    globalSearch: SearchableUnionGraphList;
  };
};

const SingleTeaser = () => {
  const params = useParams();
  const valorNameList =
    (params?.valorName && params.valorName.split('-')) || [];
  const valorNr =
    (valorNameList.length > 0 && valorNameList[valorNameList.length - 1]) || '';

  const apolloConfig = {
    query: LATEST_NATIVE_ADVERTISING_BY_VALOR_QUERY,
    variables: {
      contentTypes: [NATIVE_ADVERTISING_CONTENT_TYPE],
      limit: 1,
      publication: 'CASH',
      query: `*`,
      sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
      valors: [`${valorNr}`],
    },
    fetchPolicy: 'cache-first' as WatchQueryFetchPolicy,
  };

  const { data, loading, error } = useQuery<SingleTeaserQuery>(
    apolloConfig.query,
    {
      variables: apolloConfig.variables,
      fetchPolicy: apolloConfig.fetchPolicy,
      skip: !valorNr,
    },
  );

  if (!valorNr) {
    return null;
  }

  if (error || (!loading && !data)) {
    return null;
  }

  const node = data?.environment?.globalSearch?.edges?.[0]?.node;

  return (
    <div className="single-teaser-by-valor">
      <Teaser
        component={TEASER_LAYOUT_M}
        {...ensureTeaserInterfaceItem(node)}
      />
    </div>
  );
};

export default SingleTeaser;
