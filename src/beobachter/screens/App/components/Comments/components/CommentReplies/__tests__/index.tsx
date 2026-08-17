import { getStylesByProps } from '../index';

describe('[Component] Comments - CommentReplies', () => {
  it('Should return styles without replies', () => {
    // @ts-ignore
    const styles = getStylesByProps({ areRepliesVisible: false });
    expect(styles).toMatchSnapshot();
  });

  it('Should return styles with replies', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      areRepliesVisible: true,
    });

    expect(styles).toMatchSnapshot();
  });
});
