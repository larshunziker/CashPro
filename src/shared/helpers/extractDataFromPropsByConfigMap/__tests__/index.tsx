import { extractDataFromPropsByConfigMap } from '../index';

describe('[Function] extractDataFromPropsByConfigMap', () => {
  test.each([
    [{ config: '', props: {}, output: {} }],
    [{ config: [], props: {}, output: {} }],
    [
      {
        config: {
          subsection: {
            type: 'extract-data/type-path',
            value: ['data.routeByPath.object.title'],
          },
        },
        props: { data: { routeByPath: { object: { title: 'TestTitle' } } } },
        output: { subsection: 'TestTitle' },
      },
    ],
    [
      {
        config: {
          subsection: {
            type: 'extract-data/type-path',
            value: ['data.routeByPath.object.shortTitle'],
          },
        },
        props: { data: { routeByPath: { object: { title: 'TestTitle' } } } },
        output: { subsection: { title: 'TestTitle' } },
      },
    ],
    [
      {
        config: {
          subsection: {
            type: 'extract-data/type-path',
            value: ['data.routeByPath.object.edges.title'],
          },
        },
        props: {
          data: {
            routeByPath: {
              object: {
                edges: [{ title: 'TestTitle' }, { title: 'TestTitle2' }],
              },
            },
          },
        },
        output: {
          subsection: [{ title: 'TestTitle' }, { title: 'TestTitle2' }],
        },
      },
    ],
    [
      {
        config: {
          subsection: null,
        },
        props: { data: { routeByPath: { object: { title: 'TestTitle' } } } },
        output: { subsection: null },
      },
    ],
    [
      {
        config: {
          subsection: 'Test',
        },
        props: { data: { routeByPath: { object: { title: 'TestTitle' } } } },
        output: { subsection: 'Test' },
      },
    ],
  ])(
    'should return correct output for ensureVideoItems testcase %#',
    (testCase) => {
      expect(
        extractDataFromPropsByConfigMap(testCase.config, testCase.props),
      ).toEqual(testCase.output);
    },
  );
});
