import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import { OverviewPageHeaderProps } from '../../../typings';

let initialProps: OverviewPageHeaderProps = {};

beforeEach(() => {
  initialProps = {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    title: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    lead: null,
  };
});

describe('[Component] OverviewPageHeader - Default', () => {
  it('Should render nothing', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('wrapper')).toBeNull();
  });

  it('Should render component with title and without lead', () => {
    initialProps.title = 'Hallo welt';

    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('wrapper')).not.toBeNull();
    expect(queryByTestId('title')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('title').textContent).toBe(initialProps.title);
    expect(queryByTestId('lead')).toBeNull();
  });

  it('Should render component with title and lead', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'lead of overview page header';

    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('wrapper')).not.toBeNull();
    expect(queryByTestId('title')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('title').textContent).toBe(initialProps.title);
    expect(queryByTestId('lead')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('lead').textContent).toBe(initialProps.lead);
  });
});
