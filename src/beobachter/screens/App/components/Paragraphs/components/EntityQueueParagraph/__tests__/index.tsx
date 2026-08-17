import { getGridLayoutByProps } from '../index';

describe('[Paragraphs] EntityQueueParagraph', () => {
  it('Should render with first grid config', () => {
    // @ts-ignore
    const gridConfig = getGridLayoutByProps({ isFirst: true });
    expect(gridConfig).toMatchSnapshot();
  });

  it('Should render with default grid config', () => {
    // @ts-ignore
    const gridConfig = getGridLayoutByProps({});
    expect(gridConfig).toMatchSnapshot();
  });
});
