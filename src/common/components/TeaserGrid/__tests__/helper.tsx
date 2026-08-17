import { enrichGridConfigWithData } from '../helper';
import mockData from './mockData.json';
import autofillMockData from './mockDataAutofill.json';

describe('[Component] ComponentName', () => {
  it('Should render with ....', () => {
    expect(
      enrichGridConfigWithData({
        gridConfigItems: mockData.gridGroups,
        // @ts-ignore
        data: mockData.items,
      }),
    ).toMatchSnapshot();
  });

  it('Should render items with autofilled items....', () => {
    expect(
      enrichGridConfigWithData({
        gridConfigItems: autofillMockData.gridGroups,
        // @ts-ignore
        data: mockData.items,
      }),
    ).toMatchSnapshot();
  });

  it('Should render autofilled items only if data is present....', () => {
    expect(
      enrichGridConfigWithData({
        gridConfigItems: autofillMockData.gridGroups,
        // @ts-ignore
        data: mockData.items.slice(0, 3),
      }),
    ).toMatchSnapshot();
  });
});
