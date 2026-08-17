import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import globalSearchData from './mockData.json';

const componentFactoryOptions = {
  Icon: () => <div data-testid="autocomplete-factory-icon" />,
  IconTypes: {
    CamIcon: 'IconFotoMarker',
    VideoIcon: 'IconCamera',
  },
  styles: {
    Wrapper: 'WrapperClassName',
    Link: 'LinkClassName',
    LinkWrapper: 'LinkWrapperClassName',
    IconStyle: 'IconStyleClassName',
  },
};

let initialProps: Record<string, any> = {};
let Component: any = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    queryString: 'test query',
    data: globalSearchData,
  };
});

describe('[Component] SearchForm', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should nothing if there are no props', () => {
    initialProps.queryString = '';
    initialProps.data = {};
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly, should render search results', () => {
    const { container, queryByTestId, queryAllByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    const searchResultItems = queryAllByTestId('autocomplete-factory-item');

    expect(container).not.toBe('');
    expect(queryByTestId('autocomplete-factory-wrapper')).not.toBeNull();
    expect(searchResultItems.length).toEqual(
      initialProps.data.globalSearch.edges.length,
    );
  });
});
