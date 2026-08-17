import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../../../../shared/constants/globalSearch';
import { DEFAULT_PUBLICATION } from '../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte */
import { GET_LATEST_STORIES } from '../queries';

jest.mock('../../../../../components/Recommendations', () => {
  return () => {
    return null;
  };
});

describe('[Component] LatestStories', () => {
  test('Should render nothing when no response data', async () => {
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider>
          <Component />
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(queryByTestId('latest-stories-container')).toBeNull();

    await waitFor(() => {
      return expect(queryByTestId('latest-stories-container')).toBeNull();
    });
  });

  test('Should render latest stories properly', async () => {
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_LATEST_STORIES,
              variables: {
                contentTypes: [
                  ARTICLE_CONTENT_TYPE,
                  IMAGE_GALLERY_CONTENT_TYPE,
                  VIDEO_CONTENT_TYPE,
                ],
                limit: 4,
                publication: DEFAULT_PUBLICATION,
                sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
              },
            },
            result: mockData,
          },
        ]}
      >
        <ReduxProvider>
          <Component />
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(queryByTestId('latest-stories-container')).toBeNull();

    await waitFor(() => {
      return expect(queryByTestId('latest-stories-container')).not.toBeNull();
    });
  });
});
