import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import { getBadgeByProps, getIconByProps } from '../index';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import { MAIN_CHANNEL_PEOPLE } from '../../../../../constants';

jest.mock('../../../../Badge');

const initialState = {
  settings: settingsInitialState,
};

describe('[Component] TeaserHeroXl2x1', () => {
  test.each`
    hasVideo | __typename                         | activeMainChannel
    ${false} | ${ARTICLE_CONTENT_TYPE}            | ${MAIN_CHANNEL_PEOPLE}
    ${false} | ${IMAGE_GALLERY_CONTENT_TYPE}      | ${MAIN_CHANNEL_PEOPLE}
    ${false} | ${VIDEO_CONTENT_TYPE}              | ${MAIN_CHANNEL_PEOPLE}
    ${true}  | ${ARTICLE_CONTENT_TYPE}            | ${MAIN_CHANNEL_PEOPLE}
    ${true}  | ${NATIVE_ADVERTISING_CONTENT_TYPE} | ${MAIN_CHANNEL_PEOPLE}
  `(
    'Should generate Teaser Icon by Props for Content type $__typename of channel $activeMainChannel with Video $hasVideo',
    ({ hasVideo, __typename, activeMainChannel }) => {
      const { container } = render(
        //@ts-ignore
        getIconByProps({
          hasVideo,
          __typename,
          activeMainChannel,
        }),
      );
      expect(container).toMatchSnapshot();
    },
  );

  test.each`
    badgeLabel      | __typename                    | activeMainChannel      | subtypeValue | badgeColor,
    ${'BadgeLabel'} | ${ARTICLE_CONTENT_TYPE}       | ${MAIN_CHANNEL_PEOPLE} | ${null}      | ${'default'}
    ${null}         | ${IMAGE_GALLERY_CONTENT_TYPE} | ${MAIN_CHANNEL_PEOPLE} | ${null}      | ${'petrol'}
  `(
    'Should generate badge for ContentType $__typename of subtype $subtypeValue with label $badgeLabel in color $badgeColor on Channel $activeMainChannel',
    ({
      badgeLabel,
      __typename,
      subtypeValue,
      activeMainChannel,
      badgeColor,
    }) => {
      const store = createStore((state) => state, initialState);
      const { container } = render(
        <Provider store={store}>
          {
            //@ts-ignore
            getBadgeByProps({
              badgeLabel,
              __typename,
              activeMainChannel,
              subtypeValue,
              badgeColor,
            })
          }
        </Provider>,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
