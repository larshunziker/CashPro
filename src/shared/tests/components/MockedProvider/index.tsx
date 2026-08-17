/**
 * @file   mocked provider factory for testing purposes
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-01-22
 */
import React from 'react';
import { MemoryRouter, useInRouterContext } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { MockLink } from './mockLink';

export { WILDCARD_QUERY } from './mockLink';

type MockedProviderFinalProps = {
  mocks?: any;
  addTypename?: boolean;
  children?: React.ReactElement;
};

const MockedProviderFinal = ({
  mocks,
  addTypename,
  children,
}: MockedProviderFinalProps) => {
  // we use a custom mockLink component to have wildcard on query level
  const mockLink = new MockLink(mocks, addTypename);
  const hasLocationContext = useInRouterContext();
  if (!hasLocationContext) {
    return (
      <MockedProvider link={mockLink}>
        <MemoryRouter>{children}</MemoryRouter>
      </MockedProvider>
    );
  } else {
    return <MockedProvider link={mockLink}>{children}</MockedProvider>;
  }
};

export default MockedProviderFinal;
