import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { alertListInitialState } from '../../../../../../shared/reducers/alertList';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component, { Source } from '../index';
import articleDefaultMock from './articleDefaultMockData.json';
import articleVideoMock from './articleVideoMockData.json';
import { NATIVE_ADVERTISING_CONTENT_TYPE } from '../../../../../../shared/constants/content';
import { VIDEO_PARAGRAPH } from '../../../../../../shared/constants/paragraphs';
import { CHANNEL_TYPE_BLOG } from '../../Channel/constants';

jest.mock('../../../components/UtilityBar');
jest.mock('../../../components/UtilityBar/components/UtilityOverlay');
jest.mock('../../Article/components/ArticleAlerts');
jest.mock('../../../components/Tooltip');
jest.mock('../../../components/Teaser');
jest.mock('../../../components/SVGIcon');
jest.mock('../../../components/Recommendations');
jest.mock('../../../../../../common/components/SmoothScroll');
jest.mock('../../../components/AppNexus');
jest.mock('../../../components/ArticleHeader');
jest.mock('../../../components/AuthorBox');
jest.mock('../../../components/Badge');
jest.mock('../../../components/BloggerProfileBox');
jest.mock('../../../components/Breadcrumbs');
jest.mock('../../../components/Comments');
jest.mock('../../../components/PartnerBanner');
jest.mock('../../../components/Paragraphs');
jest.mock('../../../components/MagazineIssueSection');
jest.mock('../../../components/LoadingSpinner');
jest.mock('../../../components/EditButtons');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

const originalError = console.error; // eslint-disable-line

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(articleDefaultMock));
  initialProps = {
    ...initialProps,
  };

  initialState = {
    settings: settingsInitialState,
    alertList: alertListInitialState,
    route: routeInitialState,
  };

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.__GRAPHQL_HOST__ = 'https://api.preview.si.com/';
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('[Component] ArticlePage', () => {
  it('Should render default article correctly with all expected article containers/wrappers', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-wrapper')).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('articlepage-paragraph-container').innerHTML).not.toBe(
      '',
    );
    expect(queryByTestId('articlepage-article-alerts-wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('articlepage-author-container').innerHTML).not.toBe(
      '',
    );
    expect(queryByTestId('articlepage-partnerbanner-wrapper')).not.toBeNull();
  });

  it('Should render video article correctly with all expected article containers/wrappers', () => {
    initialProps = JSON.parse(JSON.stringify(articleVideoMock));
    initialProps.article.heroImageBody[0].__typename = VIDEO_PARAGRAPH;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-wrapper')).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('articlepage-paragraph-container').innerHTML).not.toBe(
      '',
    );
    expect(queryByTestId('articlepage-article-alerts-wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('articlepage-author-container').innerHTML).not.toBe(
      '',
    );
  });

  it('Should not render the articlepage-author-container', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.authors = null;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-author-container')).toBeNull();
  });

  it('Should render a blog article on desktop', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.channel.channelType = CHANNEL_TYPE_BLOG;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.showAuthorBox = true;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('mocked-bloggerprofilebox')).not.toBeNull();
  });

  it('Should render a blog article on mobile', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.channel.channelType = CHANNEL_TYPE_BLOG;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.showAuthorBox = true;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('blogger-profile-box-wrapper-mobile')).not.toBeNull();
  });

  it('Should video-articlepage-head-wrapper if articleType is ARTICLE_VIDEO', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.heroImageBody[0].__typename = VIDEO_PARAGRAPH;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('video-articlepage-head-wrapper')).not.toBeNull();
  });

  it('Should use channel title in case no short title is set', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.article.shortTitle;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-articleheader-wrapper')).not.toBeNull();
  });

  it('Should use channel title in case no short title is set and articleType is ARTICLE_VIDEO', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.article.shortTitle;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.heroImageBody[0].__typename = VIDEO_PARAGRAPH;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('video-articlepage-head-wrapper')).not.toBeNull();
  });

  it('Should not render ArticleAlerts if there are no keywords', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.article.keywords;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-article-alerts-wrapper')).toBeNull();
  });

  it('Should use NA sponsor instead of the channel sponsor', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.settings.activeContentType = NATIVE_ADVERTISING_CONTENT_TYPE;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.sponsor = {
      id: 'bm9kZToyMDgwNw==',
      title: '10-1-high-res',
      teaserImage: {
        id: '181903',
        link: null,
        image: {
          file: {
            alt: 'empty_1x1_img',
            relativeOriginPath: '/empty1x1img.png',
            __typename: 'ImageFile',
          },
          __typename: 'Image',
        },
        __typename: 'ImageParagraph',
      },
      backgroundImage: {
        file: {
          alt: 'highres',
          relativeOriginPath: '/highres.png',
          __typename: 'ImageFile',
        },
        __typename: 'Image',
      },
      __typename: 'Sponsor',
    };

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articlepage-partnerbanner-wrapper')).not.toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('articlepage-partnerbanner-wrapper').innerHTML,
    ).not.toBeNull();
  });

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
