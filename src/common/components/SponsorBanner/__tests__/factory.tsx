import { cleanup, render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import { SponsorBannerFactoryOptions, SponsorBannerProps } from '../typings';

let componentProps: SponsorBannerProps = {
  children: 'Test',
  label: 'sponsored by',
  //@ts-ignore
  link: 'https://handelszeitung.ch',
};

const componentFactoryOptions: SponsorBannerFactoryOptions = {
  Link: ({ children }) => (
    <div data-testid="sponsor-banner-factory-link">{children}</div>
  ),
  styles: {
    Wrapper: '.SampleWrapperClass',
    Section: '.SampleSectionClass',
    Container: '.SampleContainerClass',
    Banner: '.SampleBannerClass',
    SponsorLabelWrapper: '.SampleSponsorLabelWrapperClass',
    Label: '.SampleLabelClass',
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

beforeEach(() => {
  componentProps = {
    children: 'Test',
    label: 'sponsored by',
    //@ts-ignore
    link: 'https://handelszeitung.ch',
  };
  Component = componentFactory(componentFactoryOptions);
});
afterEach(cleanup);

describe('[Common] Sponsor Banner factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render nothing when no children are given', () => {
    delete componentProps.children;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );
    expect(queryByTestId('sponsor-banner-wrapper')).toBeNull();
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly when children are given', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );
    expect(queryByTestId('sponsor-banner-wrapper')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when no label is given', () => {
    /* @ts-ignore TODO: TS2790 ->  The operand of a 'delete' operator must be optional. */
    delete componentProps.label;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );
    expect(queryByTestId('sponsor-banner-wrapper')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing when no children are given', () => {
    delete componentProps.children;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );
    expect(queryByTestId('sponsor-banner-wrapper')).toBeNull();
    expect(container.innerHTML).toBe('');
  });
});
