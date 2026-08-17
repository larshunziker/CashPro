import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component, { JobCardPropsInner } from '../index';

let initialProps: JobCardPropsInner;

beforeEach(() => {
  initialProps = {
    title: 'title',
    url: 'www.test.ch',
    company: 'company',
    location: 'Bern',
  };
});

describe('[Component] JobCard', () => {
  it('Should return render component correctly', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />,
      </MemoryRouter>,
    );
    expect(queryByTestId('job-card-content')).toMatchSnapshot();
    expect(container.innerHTML).not.toBeNull();
  });

  it('Should not render if there is no job title', () => {
    initialProps.title = '';
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if there is no job url', () => {
    initialProps.url = '';
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });
});
