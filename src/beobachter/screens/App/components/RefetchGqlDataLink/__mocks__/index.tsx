import React from 'react';
import Link from '../../../../../../common/components/Link';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const MockedRefetchGqlDataLink = (props) => (
  <Link {...props} data-testid="mocked-refetch-gql-data-link">
    {props.children}
  </Link>
);

export default MockedRefetchGqlDataLink;
