import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider/index';
import TeaserRenderer from '../components/TeaserRenderer';
import mockedData from '../../../../../../common/components/ContentBox/__tests__/mockData.json';

const contentBoxData = {} as any;
const initialState = {};

describe('[Component] ContentBox', () => {
  it('Should not render TeaserRenderer because of missing items', () => {
    const { queryByTestId } = render(
      <TeaserRenderer contentBoxData={{ items: null }} />,
    );
    expect(queryByTestId('content-box-items-wrapper')).toBeNull();
  });

  it('Should render TeaserRenderer with all items', () => {
    contentBoxData.items =
      mockedData.node.items.edges.map((item, index) => {
        return {
          node: {
            ...item.node,
            ...item,
            index: (index += 1),
            __typename: 'NodeInterfaceEdge',
          },
        };
      }) || null;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <TeaserRenderer contentBoxData={contentBoxData} />
      </ReduxProvider>,
    );
    expect(queryByTestId('content-box-items-wrapper')).not.toBeNull();
  });
});
