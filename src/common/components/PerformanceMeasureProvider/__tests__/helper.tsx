import { removeHyphen } from '../helper';

it.each([
  ['hi-ther_friend'],
  ['das ist ____ein-test'],
  ['_1_2_3_3__3'],
  ['-2-3-3'],
  ['test'],
])('should replace hyphens with underline %#', (input) => {
  expect(removeHyphen(input)).toMatchSnapshot();
});
