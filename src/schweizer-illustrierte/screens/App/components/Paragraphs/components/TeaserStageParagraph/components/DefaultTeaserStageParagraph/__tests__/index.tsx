import { getGridLayoutByProps } from '../index';

describe('[Function] getGridOptions', () => {
  test.each([
    [
      {
        teaserStage: {
          entities: {
            edges: [{ id: '1' }, { id: '1' }, { id: '1' }],
          },
        },
        expected: 'teaserStage3Items',
      },
    ],
    [
      {
        teaserStage: {
          entities: {
            edges: [{ id: '1' }, { id: '1' }],
          },
        },
        expected: 'teaserStage2Items',
      },
    ],
    [
      {
        teaserStage: {
          entities: {
            edges: [{ id: '1' }],
          },
        },
        expected: 'teaserStage1Item',
      },
    ],
    [
      {
        teaserStage: {
          entities: {
            edges: [{ id: '1' }],
          },
        },
        expected: 'teaserStage1Item',
      },
    ],
    [
      {
        teaserStage: {
          entities: {
            edges: [{ id: '1' }, { id: '1' }, { id: '1' }, { id: '1' }],
          },
        },
        expected: 'teaserStageDefault',
      },
    ],
  ])('Should render the expected image format', (config) => {
    expect(
      //@ts-ignore
      getGridLayoutByProps({
        teaserStage: config.teaserStage,
      }),
    ).toEqual(config.expected);
  });
});
