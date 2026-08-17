import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import {
  getChildrenByProps,
  getIconByProps,
  renderArrow,
  renderBadge,
} from '../index';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import { MAIN_CHANNEL_PEOPLE } from '../../../../../constants';

const initialState = {
  settings: settingsInitialState,
};

describe('[Component] TeaserHeroS', () => {
  test.each`
    shortTitle
    ${'Fashion ShortTitle'}
    ${''}
    ${null}
  `(
    'Should generate children by Props for shortTitle $shortTitle',
    ({ shortTitle }) => {
      //@ts-ignore
      const result = getChildrenByProps({ shortTitle });
      expect(result).toMatchSnapshot();
    },
  );

  test.each`
    hasVideo | __typename                         | activeMainChannel,
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
    badgeLabel      | __typename                         | subtypeValue                       | badgeColor,
    ${'BadgeLabel'} | ${ARTICLE_CONTENT_TYPE}            | ${null}                            | ${'default'}
    ${'BadgeLabel'} | ${IMAGE_GALLERY_CONTENT_TYPE}      | ${null}                            | ${'petrol'}
    ${'BadgeLabel'} | ${VIDEO_CONTENT_TYPE}              | ${null}                            | ${'blue'}
    ${'BadgeLabel'} | ${ARTICLE_CONTENT_TYPE}            | ${null}                            | ${'default'}
    ${'BadgeLabel'} | ${NATIVE_ADVERTISING_CONTENT_TYPE} | ${ADVERTISING_TYPE_NATIVE_ARTICLE} | ${'default'}
    ${'BadgeLabel'} | ${NATIVE_ADVERTISING_CONTENT_TYPE} | ${ADVERTISING_TYPE_ADVERTORIAL}    | ${'default'}
  `(
    'Should generate badge for ContentType $__typename of subtype $subtypeValue with label $badgeLabel in color $badgeColor',
    ({ badgeLabel, __typename, subtypeValue, badgeColor }) => {
      const store = createStore((state) => state, initialState);
      const { container } = render(
        <Provider store={store}>
          {
            //@ts-ignore
            renderBadge({
              badgeLabel,
              __typename,
              subtypeValue,
              badgeColor,
            })
          }
        </Provider>,
      );
      expect(container).toMatchSnapshot();
    },
  );

  test.each([
    {
      data: {
        activeMainChannel: 'Home',
        link: {
          label: 'very-long-url-will-be-truncated.ch',
        },
        publication: null,
        preferredUri: null,
      },
      expect: 'very-lo...ted.ch',
    },
    {
      data: {
        link: null,
        publication: '',
        preferredUri: '/my-article',
        activeMainChannel: 'Home',
      },
      expect: '',
    },
    {
      data: {
        link: null,
        activeMainChannel: 'Home',
        publication: 'schweizer_illustrierte',
        preferredUri: '/my-article',
      },
      expect: '',
    },
  ])('Should render arrow correctly %#', (testData) => {
    // @ts-ignore
    const { container } = render(renderArrow({ ...testData.data }));
    expect(container.innerHTML).toContain(testData.expect);
  });
});
