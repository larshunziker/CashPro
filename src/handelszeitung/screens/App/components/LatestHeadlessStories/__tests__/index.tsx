import React from 'react';
// @ts-ignore
import Component from '../index';
import { render } from '../../../../../shared/customRenderer';
// @ts-ignore
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens */
import MockedProvider, {
  WILDCARD_QUERY,
} from './../../../../../../shared/tests/components/MockedProvider';
// @ts-ignore
import mockData from './mockData';
// @ts-ignore
import { GET_LATEST_HEADLESS_STORIES } from '../queries';

describe('[Component] LatestHeadlessStories', () => {
  test('Should render nothing when no response data', async () => {
    const { queryByTestId, findByTestId } = render(
      <MockedProvider>
        <Component />
      </MockedProvider>,
    );

    expect(queryByTestId('latest-headless-stories-wrapper')).toBeNull();

    await expect(
      findByTestId('latest-headless-stories-wrapper'),
    ).rejects.toThrow('Unable to find an element');
  });

  test('Should render nothing if response is empty object', async () => {
    const { queryByTestId, findByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: WILDCARD_QUERY,
            },
            result: {},
          },
        ]}
      >
        <Component />
      </MockedProvider>,
    );

    expect(queryByTestId('latest-headless-stories-wrapper')).toBeNull();

    await expect(
      findByTestId('latest-headless-stories-wrapper'),
    ).rejects.toThrow('Unable to find an element');
  });

  test('Should render latest headless stories correctly for HZ', async () => {
    const { queryByTestId, findByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_LATEST_HEADLESS_STORIES,
              variables: {
                limit: 4,
                publication: 'HZ',
              },
            },
            result: mockData.HZ,
          },
        ]}
      >
        <Component />
      </MockedProvider>,
    );

    expect(queryByTestId('latest-headless-stories-wrapper')).toBeNull();

    const wrapper = await findByTestId('latest-headless-stories-wrapper');
    expect(wrapper).not.toBeNull();
  });

  test('Should render latest headless stories correctly for SV', async () => {
    const { queryByTestId, findByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_LATEST_HEADLESS_STORIES,
              variables: {
                limit: 4,
                publication: 'SV',
              },
            },
            result: mockData.SV,
          },
        ]}
      >
        <Component publication="SV" />
      </MockedProvider>,
    );

    expect(queryByTestId('latest-headless-stories-wrapper')).toBeNull();

    const wrapper = await findByTestId('latest-headless-stories-wrapper');
    expect(wrapper).not.toBeNull();
  });
});
