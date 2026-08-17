import { getTealiumData, returnRestrictionStatusList } from './../helper';
import mockDataArticle from './mockDataArticle.json';
import mockDataLandingPage from './mockDataLandingPage.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'mockDataLandingPageCopy' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockDataLandingPageCopy;
/* @ts-ignore TODO: TS7034 ->  Variable 'mockDataArticleCopy' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockDataArticleCopy;
jest.mock('../../../helpers/tracking', () => {
  return {
    getAmountOfDaysPublished: jest.fn(() => 2),
  };
});

beforeEach(() => {
  mockDataLandingPageCopy = JSON.parse(JSON.stringify(mockDataLandingPage));
  mockDataArticleCopy = JSON.parse(JSON.stringify(mockDataArticle));
});

beforeAll(() => {
  // 2021-12-22T07:30:00+01:00
  Date.now = jest.fn(() => 1640154600000);
});

afterAll(() => {
  // @ts-ignore
  Date.now = new Date();
});

describe('[Function] Tealium - helpers', () => {
  it('should return tealium data landingpage', () => {
    expect(
      /* @ts-ignore TODO: TS7005 ->  Variable 'mockDataLandingPageCopy' implicitly has an 'any' type. */
      getTealiumData(mockDataLandingPageCopy.environment.routeByPath),
    ).toMatchSnapshot();
  });

  it('should return tealium data landingpage on hz home', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockDataLandingPageCopy' implicitly has an 'any' type. */
    mockDataLandingPageCopy.environment.routeByPath.preferred = '/home-hz';
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockDataLandingPageCopy' implicitly has an 'any' type. */
    mockDataLandingPageCopy.environment.routeByPath.object.preferredUri =
      '/home-hz';
    expect(
      /* @ts-ignore TODO: TS7005 ->  Variable 'mockDataLandingPageCopy' implicitly has an 'any' type. */
      getTealiumData(mockDataLandingPageCopy.environment.routeByPath),
    ).toMatchSnapshot();
  });

  it('should return tealium data article', () => {
    expect(
      /* @ts-ignore TODO: TS7005 ->  Variable 'mockDataArticleCopy' implicitly has an 'any' type. */
      getTealiumData(mockDataArticleCopy.environment.routeByPath),
    ).toMatchSnapshot();
  });

  it('should return restriction StatusList data on eq', () => {
    expect(
      returnRestrictionStatusList(
        /* @ts-ignore TODO: TS7005 ->  Variable 'mockDataLandingPageCopy' implicitly has an 'any' type. */
        mockDataLandingPageCopy.environment.routeByPath.object,
      ),
    ).toMatchSnapshot();
  });
});
