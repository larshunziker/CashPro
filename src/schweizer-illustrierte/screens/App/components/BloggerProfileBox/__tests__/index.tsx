/**
 * @file   blogger profile box test
 * @author Damian Bucki <damian.bucki@dreamlab.pl>
 * @date   2018-11-19
 */

import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

const initialProps = {
  bloggerProfile: {
    ...JSON.parse(JSON.stringify(mockData)),
  },
  blogUri: '',
  format: '',
};

describe('[Component] BloggerProfileBox', () => {
  test('Should render nothing if there are no props defined', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {
          // @ts-ignore
          <Component />
        }
      </ReduxProvider>,
    );

    expect(queryByTestId('blogger-profile-box-wrapper')).toBeNull();
  });

  test('Should render the blogger profile box wrapper correctly, if all props are passed to the component', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('blogger-profile-box-wrapper')).not.toBeNull();

    expect(queryByTestId('blogger-profile-box-image')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('blogger-profile-box-name')).toHaveTextContent(
      'Max Muster',
    );
    // @ts-ignore
    expect(queryByTestId('blogger-profile-box-description')).toHaveTextContent(
      'Ihr Teenie-Zimmer war voll ung ganz mit Starpostern tapeziert. Heute berichtet sie exklusiv für Style über die Outfits der Stars.',
    );
  });

  test('Should not render the authorbox img wrapper, if the imageParagraph source is empty', () => {
    initialProps.bloggerProfile.imageParagraph.image.file.relativeOriginPath =
      null;

    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('blogger-profile-box-image')).toBeNull();
  });
});
