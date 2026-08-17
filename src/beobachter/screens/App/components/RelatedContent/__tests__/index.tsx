import { getTeaserGridByProps } from '../index';
import { GRID_LAYOUT_RECOMMENDATIONS } from '../../TeaserGrid/gridConfigs/constants';

describe('[Component] RelatedContent', () => {
  it('Should return empty grid by props', () => {
    // @ts-ignore
    const gridConfig = getTeaserGridByProps({});
    expect(gridConfig).toBeNull();
  });

  it('Should return empty grid by props', () => {
    // @ts-ignore
    const gridConfig = getTeaserGridByProps({
      relatedContent: { edges: null },
    });
    expect(gridConfig).toBeNull();
  });

  it('Should return default grid by props', () => {
    // @ts-ignore
    const gridConfig = getTeaserGridByProps({
      teaserGridLayout: GRID_LAYOUT_RECOMMENDATIONS,
      relatedContent: { edges: [{ node: { id: '1' } }] },
    });
    expect(gridConfig).not.toBeNull();
  });
});
