import { render } from '@testing-library/react';
import { getIconByProps, getStylesByProps } from '../index';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import { MAIN_CHANNEL_PEOPLE } from '../../../../../constants';

describe('[Component] TeaserRelated', () => {
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

  it('Should generate styles correctly', () => {
    //@ts-ignore
    const styles = getStylesByProps({ activeMainChannel: MAIN_CHANNEL_PEOPLE });
    expect(styles).toMatchSnapshot();
  });
});
