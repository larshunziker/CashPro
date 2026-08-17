import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import { getChildrenByProps, getIconByProps } from '../index';
import mockData from './mockData.json';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import { MAIN_CHANNEL_PEOPLE } from '../../../../../constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] TeaserBlogPostMaxi', () => {
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
      const props: any = {
        hasVideo,
        __typename,
        activeMainChannel,
      };
      const { container } = render(
        //@ts-ignore
        <ReduxProvider>{getIconByProps(props)}</ReduxProvider>,
      );
      expect(container).toMatchSnapshot();
    },
  );

  it('Should render authorbox correctly with author correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <ReduxProvider>{getChildrenByProps(initialProps)}</ReduxProvider>,
    );
    expect(
      queryByTestId('TeaserBlogPostMaxi-Author-Picture-Wrapper'),
    ).not.toBeNull();
  });

  it('Should render authorbox correctly with channel author correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <ReduxProvider>{getChildrenByProps(initialProps)}</ReduxProvider>,
    );
    expect(
      queryByTestId('TeaserBlogPostMaxi-Author-Picture-Wrapper'),
    ).not.toBeNull();
  });

  it('Should not render authorbox of author without image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.authors.edges[0].node.imageParagraph;
    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <ReduxProvider>{getChildrenByProps(initialProps)}</ReduxProvider>,
    );
    expect(
      queryByTestId('TeaserBlogPostMaxi-Author-Picture-Wrapper'),
    ).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should not render authorbox of channel author without image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.authors;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.channel.authors.edges[0].node.imageParagraph;
    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <ReduxProvider>{getChildrenByProps(initialProps)}</ReduxProvider>,
    );
    expect(
      queryByTestId('TeaserBlogPostMaxi-Author-Picture-Wrapper'),
    ).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should not render authorbox', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.authors;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.channel;
    const result = (
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <ReduxProvider>{getChildrenByProps(initialProps)}</ReduxProvider>
    );
    expect(result).toMatchSnapshot();
  });
});
