import { getGridLayoutByProps, getStyleByProps } from '../index';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../../screens/PageScreen/constants';

describe('[Component] TeaserStageParagraph', () => {
  it('Should return default styles', () => {
    const styles = getStyleByProps({ origin: '' });
    expect(styles).toMatchSnapshot();
  });

  it('Should return marketing styles', () => {
    const styles = getStyleByProps({ origin: PAGE_SCREEN_MARKETING_TYPE });
    expect(styles).toMatchSnapshot();
  });

  it('Should return 1 item grid style', () => {
    const teaserStage = {
      entities: {
        edges: [{ node: { id: '1' } }],
      },
    };
    const gridConfig = getGridLayoutByProps({ teaserStage });
    expect(gridConfig).toMatchSnapshot();
  });

  it('Should return 2 item grid style', () => {
    const teaserStage = {
      entities: {
        edges: [{ node: { id: '1' } }, { node: { id: '2' } }],
      },
    };
    const gridConfig = getGridLayoutByProps({ teaserStage });
    expect(gridConfig).toMatchSnapshot();
  });

  it('Should return 3 item grid style', () => {
    const teaserStage = {
      entities: {
        edges: [
          { node: { id: '1' } },
          { node: { id: '2' } },
          { node: { id: '3' } },
        ],
      },
    };
    const gridConfig = getGridLayoutByProps({ teaserStage });
    expect(gridConfig).toMatchSnapshot();
  });

  it('Should return 4 item grid style', () => {
    const teaserStage = {
      entities: {
        edges: [
          { node: { id: '1' } },
          { node: { id: '2' } },
          { node: { id: '3' } },
          { node: { id: '4' } },
        ],
      },
    };
    const gridConfig = getGridLayoutByProps({ teaserStage });
    expect(gridConfig).toMatchSnapshot();
  });

  it('Should return default grid style', () => {
    const teaserStage = {
      entities: {
        edges: [
          { node: { id: '1' } },
          { node: { id: '2' } },
          { node: { id: '3' } },
          { node: { id: '4' } },
          { node: { id: '5' } },
        ],
      },
    };
    const gridConfig = getGridLayoutByProps({ teaserStage });
    expect(gridConfig).toMatchSnapshot();
  });

  it('Should return shop product grid style', () => {
    const teaserStage = {
      anchorId: '__SHOP__',
      entities: {
        edges: [
          { node: { id: '1' } },
          { node: { id: '2' } },
          { node: { id: '3' } },
        ],
      },
    };
    const gridConfig = getGridLayoutByProps({ teaserStage });
    expect(gridConfig).toMatchSnapshot();
  });
});
