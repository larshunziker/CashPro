import { getStylesByProps } from '../index';

describe('[Component] Comments - CommentReplyForm', () => {
  it('Should return invisible form styles', () => {
    // @ts-ignore
    const styles = getStylesByProps({ isFormVisible: false });
    expect(styles).toMatchSnapshot();
  });

  it('Should return visible form styles ', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      isFormVisible: true,
    });
    expect(styles).toMatchSnapshot();
  });
});
