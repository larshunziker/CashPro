import { getStylesByProps } from '../index';

describe('[Component] CommentReplies', () => {
  test.each`
    areRepliesVisible
    ${true}
    ${false}
  `(
    'Should generate CommentReplies styles correctly when areRepliesVisibile is $areRepliesVisible',
    ({ areRepliesVisible }) => {
      //@ts-ignore
      const styles = getStylesByProps({ areRepliesVisible });
      expect(styles).toMatchSnapshot();
    },
  );
});
