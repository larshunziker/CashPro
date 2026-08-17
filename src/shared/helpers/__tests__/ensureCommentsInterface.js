/**
 * @file   ensureCommentsInterface test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-16 14:30:00
 */

import ensureCommentsInterface from '../ensureCommentsInterface';

describe('[Function] ensureCommentsInterface', () => {
  it.each([
    [
      {
        nodes: null,
      },
    ],
    [
      {
        nodes: [
          {
            node: {
              commentReplies: {
                edges: [
                  {
                    node: {
                      id: '1',
                      body: '',
                      createDate: '12.12.2019',
                      name: '',
                      cid: '12',
                      canonicalUri: 'https://beobachter.ch/artikel',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
    [
      {
        nodes: [
          {
            node: {
              commentReplies: {
                edges: [
                  {
                    node: {
                      id: '1',
                      body: 'test commentw',
                      createDate: '12.12.2019',
                      name: 'Peter',
                      cid: '12',
                      canonicalUri: 'https://beobachter.ch/artikel',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  ])('Should match the snapshot %#', (testData) => {
    expect(ensureCommentsInterface(testData.nodes)).toMatchSnapshot();
  });
});
