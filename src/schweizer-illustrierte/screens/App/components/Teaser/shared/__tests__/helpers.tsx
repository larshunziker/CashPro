import { render } from '@testing-library/react';
import { getIconPositionByProps, getRenderArrow } from '../helpers';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';

const renderArrow = getRenderArrow({});

describe('[helpers] renderArrow', () => {
  it.each([
    {
      data: {
        link: null,
        activeMainChannel: 'Home',
        publication: 'beobachter',
        preferredUri: 'https://www.beobachter.ch/my-article',
      },
      expect: 'beobachter.ch',
    },
    {
      data: {
        link: null,
        activeMainChannel: 'Home',
        publication: 'gault_millau',
        preferredUri: 'https://www.gaultmillau.ch/my-article',
      },
      expect: 'gaultmillau.ch',
    },
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
  ])('should match expecting result %#', (testData) => {
    // @ts-ignore
    const arrow = renderArrow(testData.data);

    const { container } = render(arrow);
    expect(container.innerHTML).toContain(testData.expect);
  });

  test.each`
    __typename                         | showIconOnImage
    ${ARTICLE_CONTENT_TYPE}            | ${false}
    ${IMAGE_GALLERY_CONTENT_TYPE}      | ${false}
    ${VIDEO_CONTENT_TYPE}              | ${true}
    ${ARTICLE_CONTENT_TYPE}            | ${false}
    ${NATIVE_ADVERTISING_CONTENT_TYPE} | ${false}
  `(
    'Should show Icon on Image for Content type $__typename',
    ({ __typename, showIconOnImage }) => {
      //@ts-ignore
      const result = getIconPositionByProps({
        __typename,
      });

      expect(result).toBe(showIconOnImage);
    },
  );
});
