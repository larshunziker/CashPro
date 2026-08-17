import React from 'react';
import { Source, getIconByProps } from '../helpers';
import { render } from '../../../../../../shared/customRenderer';
import {
  ARTICLE_CONTENT_TYPE,
  DOSSIER_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';

describe('[HELPER] Teaser helpers', () => {
  test.each`
    typename                      | hasVideo
    ${DOSSIER_CONTENT_TYPE}       | ${true}
    ${ARTICLE_CONTENT_TYPE}       | ${false}
    ${ARTICLE_CONTENT_TYPE}       | ${true}
    ${VIDEO_CONTENT_TYPE}         | ${null}
    ${IMAGE_GALLERY_CONTENT_TYPE} | ${null}
  `(
    'Should render Icon for content type $typename properly',
    ({ hasVideo, typename }) => {
      const getIcon = getIconByProps('IconClass');
      const { container } = render(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Element | null' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstruc */
        getIcon({ __typename: typename, hasVideo: hasVideo }),
      );

      expect(container).toMatchSnapshot();
    },
  );

  test.each`
    source
    ${null}
    ${'Schweizer Illustrierte'}
    ${'Beobachter'}
    ${''}
  `(
    'Should render Source Component for source $source correctly',
    ({ source }) => {
      const { container } = render(<Source source={source} />);
      expect(container).toMatchSnapshot();
    },
  );
});
