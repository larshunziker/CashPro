import { render } from '@testing-library/react';
import { getRecommendationItems } from '../helpers';
import {
  getArticleHeaderByProps,
  getLinkButtonByProps,
  getOverviewPageHeaderByProps,
  getSocialBarByProps,
} from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});

jest.mock('../../../components/UtilityBar');
jest.mock('../../../components/UtilityBar/components/UtilityOverlay');
jest.mock('../../../components/ArticleHeader');
jest.mock('../../../components/AppNexus');
jest.mock('../../../components/OverviewPageHeader');
jest.mock('../../../components/Paragraphs');
jest.mock('../../../components/Recommendations');
jest.mock('../../Article/components/ArticleAlerts');

describe('[Screen] Video', () => {
  test.each([
    { inputArray1: [1, 2], inputArray2: [3, 4], expectedOutput: [2, 1, 3, 4] },
    { inputArray1: [1], inputArray2: [2], expectedOutput: [1, 2] },
    { inputArray1: [1, 2, 3], inputArray2: [4], expectedOutput: [3, 2, 1, 4] },
    {
      inputArray1: [1, 2, 3, 4],
      inputArray2: [5],
      expectedOutput: [3, 2, 1, 5],
    },
    {
      inputArray1: [1],
      inputArray2: [2, 3, 4, 5],
      expectedOutput: [1, 2, 3, 4],
    },
    {
      inputArray1: [1, 2, 3, 4],
      inputArray2: [5, 6, 7, 8],
      expectedOutput: [2, 1, 5, 6],
    },
    { inputArray1: [], inputArray2: [1], expectedOutput: [1] },
    { inputArray1: [], inputArray2: [1, 2], expectedOutput: [1, 2] },
    { inputArray1: [], inputArray2: [1, 2, 3], expectedOutput: [1, 2, 3] },
    {
      inputArray1: [],
      inputArray2: [1, 2, 3, 4],
      expectedOutput: [1, 2, 3, 4],
    },
    { inputArray1: [1], inputArray2: [], expectedOutput: [1] },
    { inputArray1: [1, 2], inputArray2: [], expectedOutput: [2, 1] },
    { inputArray1: [1, 2, 3], inputArray2: [], expectedOutput: [3, 2, 1] },
    {
      inputArray1: [1, 2, 3, 4],
      inputArray2: [],
      expectedOutput: [4, 3, 2, 1],
    },
  ])(
    'should return correct for helper function getRecommendationItems, Nr. $#',
    (testCase) => {
      expect(
        getRecommendationItems(testCase.inputArray1, testCase.inputArray2),
      ).toEqual(testCase.expectedOutput);
    },
  );

  it('Should render SocialBar correctly', () => {
    const { queryByTestId } = render(getSocialBarByProps());
    expect(queryByTestId('video-social-bar-wrapper')).not.toBeNull();
  });

  it('Should render LinkButton correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(getLinkButtonByProps({ ...initialProps }));
    expect(queryByTestId('video-link-button-wrapper')).not.toBeNull();
  });

  it('Should render ArticleHeader correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      getArticleHeaderByProps({ ...initialProps }),
    );
    expect(queryByTestId('video-article-header-wrapper')).not.toBeNull();
  });

  it('Should render OverviewPageHeader correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      getOverviewPageHeaderByProps({ ...initialProps }),
    );
    expect(queryByTestId('video-overview-page-header-wrapper')).not.toBeNull();
  });
});
