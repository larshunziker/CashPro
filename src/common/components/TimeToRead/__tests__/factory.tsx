import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';

const configList = [
  {},
  {
    seconds: 0,
  },
  {
    seconds: 1,
  },
  {
    seconds: 59,
  },
  {
    seconds: 60,
  },
  {
    seconds: 61,
  },
  {
    seconds: 89,
  },
  {
    seconds: 90,
  },
  {
    seconds: 91,
  },
];

const ComponentDefaultPrefix = componentFactory({
  Icon: () => <div>icon</div>,
  styles: { Wrapper: 'Wrapper' },
});

const ComponentCustomPrefix = componentFactory({
  Icon: () => <div>icon</div>,
  styles: { Wrapper: 'Wrapper' },
  prefix: 'custom-prefix',
});

describe('[Component] TimeToRead factory with default prefix', () => {
  it.each(configList)(
    'Should match snapshot with default prefix and given props $#',
    (props) => {
      const { container } = render(
        <ComponentDefaultPrefix addClass="extra-classname" {...props} />,
      );
      expect(container).toMatchSnapshot();
    },
  );

  it.each(configList)(
    'Should match snapshot with custom prefix and given props $#',
    (props) => {
      const { container } = render(
        <ComponentCustomPrefix addClass="extra-classname" {...props} />,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
