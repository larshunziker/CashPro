import { getStyleByProps } from '../index';

describe('[Component] Commenting', () => {
  test.each`
    isCommentingVisible | username
    ${true}             | ${'testusername'}
    ${true}             | ${''}
    ${false}            | ${'testusername'}
    ${false}            | ${''}
  `(
    'Should generate Commenting styles correctly when isCommentingVisible is $isFormVisible for username $username',
    ({ isCommentingVisible, username }) => {
      //@ts-ignore
      const styles = getStyleByProps({ isCommentingVisible, username });
      expect(styles).toMatchSnapshot();
    },
  );
});
