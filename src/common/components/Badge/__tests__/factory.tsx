import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import { BadgeFactoryOptions } from '../typings';

// @ts-ignore
const componentFactoryOptions: BadgeFactoryOptions = {
  styles: {
    Wrapper: '.SampleWrapperClass',
    Content: '.SampleContentWrapperClass',
  },
};

const defaultProps = {
  label: 'i am a label',
};

describe('[Common] Badge', () => {
  it('Should not render factory', () => {
    const Component = componentFactory(componentFactoryOptions);
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('badge-factory-wrapper')).toBeNull();
  });

  it('Should render factory correctly', () => {
    const Component = componentFactory({
      ...componentFactoryOptions,
    });
    // @ts-ignore
    const { queryByTestId } = render(<Component {...defaultProps} />);
    expect(queryByTestId('badge-factory-wrapper')).not.toBeNull();
  });
});
