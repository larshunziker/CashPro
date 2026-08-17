import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../index';

const TestComponent = ({ shouldThrowAnError = false }) => {
  if (shouldThrowAnError) {
    throw new Error('Error');
  }
  return <div>hello world</div>;
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('[Component] ErrorBoundary', () => {
  it('Should render correctly without error', () => {
    // @ts-ignore
    __PRODUCTION__ = false;
    const { container } = render(
      <ErrorBoundary>
        <TestComponent shouldThrowAnError={false}></TestComponent>
      </ErrorBoundary>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with error', () => {
    // @ts-ignore
    __PRODUCTION__ = false;
    const { container } = render(
      <ErrorBoundary>
        <TestComponent shouldThrowAnError={true}></TestComponent>
      </ErrorBoundary>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without error on PRODUCTION env', () => {
    // @ts-ignore
    __PRODUCTION__ = true;
    const { container } = render(
      <ErrorBoundary>
        <TestComponent shouldThrowAnError={false}></TestComponent>
      </ErrorBoundary>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with error on PRODUCTION env', () => {
    // @ts-ignore
    __PRODUCTION__ = true;
    const { container } = render(
      <ErrorBoundary>
        <TestComponent shouldThrowAnError={true}></TestComponent>
      </ErrorBoundary>,
    );
    expect(container).toMatchSnapshot();
  });
});
