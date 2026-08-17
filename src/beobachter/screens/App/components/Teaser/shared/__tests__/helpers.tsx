import { render } from '@testing-library/react';
import { TIME_ELAPSED_FORMAT_LONG } from '../../../../../../../shared/helpers/dateTimeElapsed';
import {
  ensureTeaserInterfaceItem,
  getBadgeByProps,
  getIconByProps,
  renderAuthorsAndDateElement,
} from '../helpers';
import mockData from '../../../Teaser/__tests__/mockData.json';
import {
  ARTICLE_CONTENT_TYPE,
  DOSSIER_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[HELPER] Teaser helpers', () => {
  test.each`
    typename                | hasVideo
    ${DOSSIER_CONTENT_TYPE} | ${true}
    ${ARTICLE_CONTENT_TYPE} | ${false}
    ${ARTICLE_CONTENT_TYPE} | ${true}
    ${VIDEO_CONTENT_TYPE}   | ${null}
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

  it('Should render author with dates', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.authors.edges = [
      {
        node: {
          id: 'YXV0aG9yOjYyNTM=',
          name: 'Andrea Haefely',
          imageParagraph: {
            id: '1104845',
            caption:
              '<p>«Natürlich war da eine gewisse Genugtuung, dass die Wahrheit, wie ich sie immer vertreten habe, offiziell bestätigt wurde», sagt Adam Quadroni.</p>\n',
            hasFallbackImage: false,
            image: {
              credit: 'Hanna Jaray',
              file: {
                alt: 'Adam Quadroni',
                focalPointX: 1000,
                focalPointY: 1000,
                relativeOriginPath:
                  '/adam_quadroni_whistleblower_baukartell.png',
                __typename: 'ImageFile',
              },
              __typename: 'Image',
            },
            __typename: 'ImageParagraph',
          },
          __typename: 'Author',
        },
        __typename: 'AuthorEdge',
      },
      {
        node: {
          id: 'YXV0aG9yOjYyNTM==',
          name: 'Julia Mustername',
          imageParagraph: {
            id: '1104845',
            caption:
              '<p>«Natürlich war da eine gewisse Genugtuung, dass die Wahrheit, wie ich sie immer vertreten habe, offiziell bestätigt wurde», sagt Adam Quadroni.</p>\n',
            hasFallbackImage: false,
            image: {
              credit: 'Hanna Jaray',
              file: {
                alt: 'Adam Quadroni',
                focalPointX: 1000,
                focalPointY: 1000,
                relativeOriginPath:
                  '/adam_quadroni_whistleblower_baukartell.png',
                __typename: 'ImageFile',
              },
              __typename: 'Image',
            },
            __typename: 'ImageParagraph',
          },
          __typename: 'Author',
        },
        __typename: 'AuthorEdge',
      },
    ];
    const container = renderAuthorsAndDateElement(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.node,
      TIME_ELAPSED_FORMAT_LONG,
      'https://api.testing.ch',
      false,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render author with dates without images', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.authors.edges = [
      {
        node: {
          id: 'YXV0aG9yOjYyNTM=',
          name: 'Andrea Haefely',
          imageParagraph: null,
          __typename: 'Author',
        },
        __typename: 'AuthorEdge',
      },
      {
        node: {
          id: 'YXV0aG9yOjYyNTM==',
          name: 'Julia Mustername',
          imageParagraph: null,
          __typename: 'Author',
        },
        __typename: 'AuthorEdge',
      },
    ];
    const container = renderAuthorsAndDateElement(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.node,
      TIME_ELAPSED_FORMAT_LONG,
      'https://api.testing.ch',
      false,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render dates only', () => {
    const container = renderAuthorsAndDateElement(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.node,
      TIME_ELAPSED_FORMAT_LONG,
      'https://api.testing.ch',
      false,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should return empty ensured teaser interface', () => {
    const container = ensureTeaserInterfaceItem(null);
    expect(container).toBe(null);
  });

  it('Should return badge by props', () => {
    const container = getBadgeByProps('someBadgeStyle');
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.articleType = 'opinion';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(container(initialProps.node)).toMatchSnapshot();
  });
});
