import { getStyleByProps } from '../index';

describe('[Component] Comments - Commenting', () => {
  it('Should return no visible comments styles', () => {
    // @ts-ignore
    const styles = getStyleByProps({ isCommentingVisible: false });
    expect(styles).toMatchSnapshot();
  });

  it('Should return visible comments styles', () => {
    // @ts-ignore
    const styles = getStyleByProps({
      isCommentingVisible: true,
    });
    expect(styles).toMatchSnapshot();
  });
});
