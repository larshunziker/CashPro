import {
  grepJsTagsFromView,
  grepStyleTagsFromView,
  stripScriptTagsFromView,
} from '../ssrPreload';
import mockData from './mockData/ssrPreloadMockData.json';

describe('[ssrPreload]', () => {
  it('Should grep js tags from view', () => {
    const result = grepJsTagsFromView(mockData.html);
    expect(result).toMatchSnapshot();
  });

  it('Should script tags from view', () => {
    const result = stripScriptTagsFromView(mockData.html);
    expect(result).toMatchSnapshot();
  });

  it('Should grep css tags from view', () => {
    const result = grepStyleTagsFromView(mockData.html);
    expect(result).toMatchSnapshot();
  });
});
