import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import { getInnerContentByProps, getOuterContentByProps } from '../index';

describe('[Component] TeaserBookmark', () => {
  test.each`
    publicationDate          | changeDate               | createDate
    ${'2016-11-24T08:00:08'} | ${'2017-11-25T08:00:08'} | ${'2017-11-23T08:00:08'}
    ${'2016-11-24T08:00:08'} | ${'2017-11-25T08:00:08'} | ${null}
    ${'2016-11-24T08:00:08'} | ${null}                  | ${'2017-11-23T08:00:08'}
    ${null}                  | ${'2017-11-25T08:00:08'} | ${'2017-11-23T08:00:08'}
    ${null}                  | ${null}                  | ${'2017-11-23T08:00:08'}
    ${'2016-11-24T08:00:08'} | ${null}                  | ${null}
    ${null}                  | ${'2017-11-25T08:00:08'} | ${null}
  `(
    'Should generate InnerContentByProps correctly',
    ({ publicationDate, changeDate, createDate }) => {
      const { container } = render(
        //@ts-ignore
        getInnerContentByProps({
          publicationDate,
          changeDate,
          createDate,
        }),
      );
      expect(container).toMatchSnapshot();
    },
  );

  it('Should BookmarkButton correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={{}}>
        {/*@ts-ignore*/}
        {getOuterContentByProps({ id: '432342' })}
      </ReduxProvider>,
    );
    expect(queryByTestId('teaserbookmark-bookmark-button')).not.toBeNull();
  });
});
