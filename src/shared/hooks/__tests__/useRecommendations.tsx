import { cleanup, waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import useRecommendations from '../useRecommendations';
import { RECOMMENDATION_OPERATION } from '../../constants/recommendations';

afterEach(cleanup);

const originalError = console.error; // eslint-disable-line
const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          recommendations: {
            metaData: {
              contentId: '1',
            },
            items: [
              {
                title: 'Item 1',
                gcid: 'a1',
              },
              {
                title: 'Item 2',
                gcid: 'a2',
              },
            ],
          },
        },
      }),
  }),
);

global.fetch = mockFetch as any as (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

beforeEach(() => {
  mockFetch.mockClear();
});

beforeAll(() => {
  console.error = jest.fn(); // eslint-disable-line
});

afterAll(() => {
  console.error = originalError; // eslint-disable-line
});

// Exactly what I needed. I copied this from here: https://jestjs.io/docs/en/expect.html#expectextendmatchers
expect.extend({
  toContainValidRecommendations(recommendations) {
    let pass = true;
    let message = '';
    if (
      recommendations &&
      recommendations.items &&
      recommendations.items.length
    ) {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      recommendations.items.forEach((item) => {
        if (!item.node.gcid) {
          pass = false;
          message = `${message} Recommendations received from hook are not valid.\n`;
        }
      });
    } else {
      pass = false;
      message = `${message} No recommendations received from hook.\n`;
    }
    if (
      !recommendations ||
      !recommendations.metaData ||
      !recommendations.metaData.type ||
      recommendations.metaData.type === ''
    ) {
      pass = false;
      message = `${message} No type received from hook.\n`;
    }
    if (!pass) {
      message = `${message} Test failed with response: ${JSON.stringify(
        recommendations,
      )}.\n`;
    }
    return {
      message: () => message,
      pass,
    };
  },
});

describe('[Hook] useRecommendations hook', () => {
  it.each([
    [
      {
        contentId: '178306',
        publication: 'BEO',
        excludeHistory: true,
      },
    ],
    [
      {
        contentId: '246666',
        publication: 'BIL',
        excludeHistory: true,
      },
    ],
  ])('Should return valid response $#', async (testCase) => {
    const { result } = renderHook(() => useRecommendations());

    act(() =>
      /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
      result.current.fetchRecommendations({
        contentId: testCase.contentId,
        publication: testCase.publication,
        excludeHistory: testCase.excludeHistory,
        operation: RECOMMENDATION_OPERATION.DEFAULT,
        articleKeywords: {},
      }),
    );
    await waitFor(() => {
      expect(
        result.current.recommendations[RECOMMENDATION_OPERATION.DEFAULT],
      ).toContainValidRecommendations();
    });
  });
});
