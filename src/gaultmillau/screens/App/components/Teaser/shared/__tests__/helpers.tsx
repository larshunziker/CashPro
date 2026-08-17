import { render } from '@testing-library/react';
import { getIconAndBorderByProps, getInnerContentByProps } from '../helpers';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_JOURNALISTIC,
  ARTICLE_TYPE_RESTAURANT,
  ORGANIZATION_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  ARTICLE_TYPE_BLOG_A,
  ARTICLE_TYPE_BLOG_B,
} from '../../../../constants';
import { ORGANIZATION_TYPE_POP } from '../../../../screens/PopRestaurants/constants';
import { getStyleByType } from '../constants';

describe('[HELPER] Teaser helpers', () => {
  test.each`
    hasVideo
    ${false}
    ${true}
    ${null}
  `(
    'Should render Icon for content type when hasVideo is $hasVideo properly',
    ({ hasVideo }) => {
      const getIcon = getIconAndBorderByProps('IconClass');
      //@ts-ignore
      const { container } = render(getIcon({ hasVideo }));
      expect(container).toMatchSnapshot();
    },
  );

  test.each`
    description
    ${null}
    ${''}
    ${'<div>Fish is great</div>'}
    ${'Fish is great'}
  `(
    'Should render InnerContent correcttly when description $description is set',
    ({ description }) => {
      const getInnerContent = getInnerContentByProps('LeadClass');
      //@ts-ignore
      const { container } = render(getInnerContent({ description }));
      expect(container).toMatchSnapshot();
    },
  );

  test.each`
    typename                | subtypeValue                 | style
    ${ARTICLE_CONTENT_TYPE} | ${ARTICLE_TYPE_BLOG_A}       | ${'Blue'}
    ${ARTICLE_CONTENT_TYPE} | ${ARTICLE_TYPE_BLOG_B}       | ${'Purple'}
    ${ARTICLE_CONTENT_TYPE} | ${ARTICLE_TYPE_JOURNALISTIC} | ${''}
    ${ARTICLE_CONTENT_TYPE} | ${'OtherType'}               | ${''}
    ${''}                   | ${''}                        | ${''}
  `(
    'Should render correct style $style for Articles of subtype $subtypeValue',
    ({ typename, subtypeValue, style }) => {
      expect(getStyleByType({ __typename: typename, subtypeValue })).toBe(
        style,
      );
    },
  );

  test.each`
    typename               | teaserType                 | style
    ${TEASER_CONTENT_TYPE} | ${ARTICLE_TYPE_BLOG_A}     | ${'Blue'}
    ${TEASER_CONTENT_TYPE} | ${ARTICLE_TYPE_BLOG_B}     | ${'Purple'}
    ${TEASER_CONTENT_TYPE} | ${ARTICLE_TYPE_RESTAURANT} | ${'Gold'}
    ${TEASER_CONTENT_TYPE} | ${'OtherType'}             | ${''}
    ${''}                  | ${''}                      | ${''}
  `(
    'Should render correct style $style for Teaser of teaserType $teaserType',
    ({ typename, teaserType, style }) => {
      expect(getStyleByType({ __typename: typename, teaserType })).toBe(style);
    },
  );

  test.each`
    typename                     | organizationType         | style
    ${ORGANIZATION_CONTENT_TYPE} | ${'default'}             | ${'Gold'}
    ${ORGANIZATION_CONTENT_TYPE} | ${ORGANIZATION_TYPE_POP} | ${''}
    ${'OtherType'}               | ${'OtherType'}           | ${''}
  `(
    'Should render correct style $style for Organization of organizationType $organizationType',
    ({ typename, organizationType, style }) => {
      expect(getStyleByType({ __typename: typename, organizationType })).toBe(
        style,
      );
    },
  );
});
