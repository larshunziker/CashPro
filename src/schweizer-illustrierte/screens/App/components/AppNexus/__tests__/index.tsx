import { mapViewportToAdViewport } from '../index';

it.each([
  [{ input: { label: 'viewport/xs', from: 0, to: 479 } }],
  [{ input: { label: 'viewport/sm', from: 479, to: 759 } }],
  [{ input: { label: 'viewport/md', from: 759, to: 959 } }],
  [{ input: { label: 'viewport/lg', from: 960, to: 1199 } }],
  [{ input: { label: 'viewport/xl', from: 1200, to: 1679 } }],
  [{ input: { label: 'viewport/xxl', from: 1680, to: 99999999 } }],
  [{ input: { age: 22 } }],
  [{ input: 'viewport/xxl' }],
  [{ input: 'viewport/xs' }],
  [{ input: 'viewport/sm' }],
  [{ input: 'fds' }],
])('double(%d)', (testCase) => {
  expect(mapViewportToAdViewport(testCase.input as any)).toMatchSnapshot();
});
