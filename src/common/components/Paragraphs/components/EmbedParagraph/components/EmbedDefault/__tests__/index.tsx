/**
 * @file   embedDefault test
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2018-07-12
 */

import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import mockOptions from './mockData.json';

let mockOptionsCopy: any = null;

beforeEach(() => {
  mockOptionsCopy = JSON.parse(JSON.stringify(mockOptions));
});

describe('[Common] EmbedParagraph - EmbedDefault', () => {
  it('Should render script tags with alert', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    const { queryByTestId } = render(
      <Component code={mockOptionsCopy.embedCode} />,
    );

    expect(queryByTestId('embed-default-wrapper')).not.toBeNull();
    expect(console.warn).toBeCalled(); // eslint-disable-line no-console
  });
});
