// @ts-nocheck
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_SEATCHANGE,
} from '../../../../../../../../shared/constants/content';
import { ArticleTitleProps } from '../typings';

// jest.mock('UtilityBar', () => {
//   return () => {
//     return null;
//   };
// });
// jest.mock('UtilityBar/components/UtilityOverlay', () => {
//   return () => {
//     return null;
//   };
// });

let initialProps: ArticleTitleProps = {
  article: { subtypeValue: '' },
  articleColStyle: '',
};

beforeEach(() => {
  initialProps = {
    article: JSON.parse(JSON.stringify(mockData)),
    articleColStyle: '',
  };
});
afterEach(cleanup);

describe('[Component] Article Title', () => {
  it('Should render regular article correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articletitle-wrapper')).not.toBeNull();
    expect(queryByTestId('articletitle-title-wrapper')).not.toBeNull();
  });

  it('Should render regular seat change article correctly', () => {
    initialProps.article.subtypeValue = ARTICLE_TYPE_SEATCHANGE;
    const { queryByTestId } = render(
      <ReduxProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articletitle-wrapper')).not.toBeNull();
    expect(queryByTestId('articletitle-title-wrapper')).not.toBeNull();
  });

  it('Should render regular guide article correctly', () => {
    initialProps.article.subtypeValue = ARTICLE_TYPE_GUIDE;
    initialProps.article.shortTitle = '';
    const { queryByTestId } = render(
      <ReduxProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articletitle-wrapper')).not.toBeNull();
    expect(queryByTestId('articletitle-title-wrapper')).not.toBeNull();
  });

  it('Should render opinion badge if article is of opinion type', () => {
    delete initialProps.article.shortTitle;
    const { queryByTestId } = render(
      <ReduxProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articletitle-wrapper')).not.toBeNull();
    expect(queryByTestId('articletitle-title-wrapper')).not.toBeNull();
    expect(queryByTestId('articletitle-shorttitle').innerHTML).toBe(
      'Kommentar',
    );
  });

  // it('Should render Native Advertising shorttitle if article is Native Advertising', () => {
  //   initialProps.article.subtypeValue = ADVERTISING_TYPE_NATIVE_ARTICLE;
  //   delete initialProps.article.shortTitle;
  //   // initialProps.article.advertisingTypeLabel = 'Publireportage';
  //   const { queryByTestId } = render(
  //     <ReduxProvider>
  //       <HelmetProvider>
  //         <Component {...initialProps} />
  //       </HelmetProvider>
  //     </ReduxProvider>,
  //   );
  //   expect(queryByTestId('articletitle-shorttitle').innerHTML).toBe(
  //     'Native Advertising',
  //   );
  // });

  it('Should render correctly in case there is no short title and no channel', () => {
    delete initialProps.article.shortTitle;
    delete initialProps.article.channel;
    const { queryByTestId } = render(
      <ReduxProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('articletitle-wrapper')).not.toBeNull();
    expect(queryByTestId('articletitle-title-wrapper')).not.toBeNull();
  });
});
