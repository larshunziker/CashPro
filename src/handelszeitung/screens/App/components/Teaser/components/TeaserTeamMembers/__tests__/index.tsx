import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import TeaserTeamMembersComponent from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const Component = (props: any) => {
  return (
    <ReduxProvider>
      <TeaserTeamMembersComponent {...props} />
    </ReduxProvider>
  );
};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Teaser] TeaserTeamMembers', () => {
  it('should render without link', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with link', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.person.hasArticles = true;
    const { container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render without image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.person.teaserImage = null;
    const { container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
