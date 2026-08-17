import { getStylesByProps } from '../index';

describe('[Component] CommentReplyForm', () => {
  test.each`
    isFormVisible
    ${true}
    ${false}
  `(
    'Should generate CommentReplyForm styles correctly when isFormVisible is $isFormVisible',
    ({ isFormVisible }) => {
      //@ts-ignore
      const styles = getStylesByProps({ isFormVisible });
      expect(styles).toMatchSnapshot();
    },
  );
});
