import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../index'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App/ */
import Component from '../index';
import mockData from './mockData.json';

const initialProps = JSON.parse(JSON.stringify(mockData));

describe('[MinistageParagraphs] MinistageDisruptor', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('ministage-disruptor-wrapper')).not.toBeNull();
  });

  it('Should render nothing if no ministageDisruptor data', () => {
    const { queryByTestId } = render(<Component ministageDisruptor={null} />);
    expect(queryByTestId('ministage-disruptor-wrapper')).toBeNull();
  });
});
