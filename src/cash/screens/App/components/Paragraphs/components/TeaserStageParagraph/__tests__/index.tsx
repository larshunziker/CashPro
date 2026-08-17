import { getGridLayoutByProps } from '../index';

test.each`
  teaserStage                                                 | gridLayoutResult
  ${{ teaserStage: { entities: { edges: { length: 4 } } } }}  | ${'teaserStageDefault'}
  ${{ teaserStage: { entities: { edges: { length: 1 } } } }}  | ${'teaserStage1Item'}
  ${{ teaserStage: { entities: { edges: { length: 2 } } } }}  | ${'teaserStage2Items'}
  ${{ teaserStage: { entities: { edges: { length: 3 } } } }}  | ${'teaserStage3Items'}
  ${{ teaserStage: { entities: { edges: { length: 12 } } } }} | ${'teaserStageUnlimited'}
`('Should return correct gridLayout', ({ teaserStage, gridLayoutResult }) => {
  const gridLayout = getGridLayoutByProps(teaserStage);
  expect(gridLayout).toBe(gridLayoutResult);
});
