import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import { LinkComponent } from '../../../../Link/typings';
import type {
  TeaserTextComponent,
  TeaserTextFactoryOptions,
  TeaserTextFactoryProps,
} from '../typings';

// @ts-ignore
let initialProps: TeaserTextFactoryProps = {};
// @ts-ignore
let componentFactoryOptions: TeaserTextFactoryOptions<any> = {};
let Component: TeaserTextComponent = () => null;

const Link: LinkComponent = ({ children }) => <a href="/">{children}</a>;
const shortTitleElement = (
  <div>
    <span>custom shortTitle</span>
  </div>
);

beforeEach(() => {
  componentFactoryOptions = {
    Link: Link,
    styles: {
      Wrapper: 'WrapperClassName',
      Title: 'TitleClassName',
      LinkWrapper: 'LinkWrapperClassName',
      ShortTitle: 'ShortTitleClassName',
      Lead: 'LeadClassName',
    },
  };

  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    title: 'sample title',
    shortTitle: 'sample shortTitle',
    preferredUri: 'http://example.com/test/',
  };
});

describe('[Common] TeaserText', () => {
  it('Should not render factory', () => {
    // @ts-ignore
    initialProps = {};
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render nothing if there is no title', () => {
    initialProps.title = '';
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render factory correctly', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render factory correctly with shortTitleElement', () => {
    initialProps.shortTitleElement = shortTitleElement;
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
