import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

const initialProps = JSON.parse(JSON.stringify(mockData));
const initialState = {};

/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
global.locationOrigin = 'https://www.beobachter.ch';

const componentFactoryOptions = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  Link: ({ children }) => (
    <div data-testid="breadcrumbs-factory-link">{children}</div>
  ),
  styles: {
    OuterWrapper: 'OuterWrapperClassName',
    Wrapper: 'WrapperClassName',
    List: 'ListClassName',
    Link: 'LinkClassName',
  },
};
const Component: any = componentFactory(componentFactoryOptions);

test('Should render nothing', () => {
  const { container } = render(<Component pageUrl="" items={{}} />);
  expect(container.innerHTML).toBe('');
});

test('Should render Breadcrumbs correctly', () => {
  const { container } = render(
    <ReduxProvider initialState={initialState}>
      <HelmetProvider>
        <Component
          pageUrl={initialProps.preferredUri}
          items={initialProps.activeMenuTrail}
        />
      </HelmetProvider>
    </ReduxProvider>,
  );
  expect(container).toMatchSnapshot();
});

test('Should not render Breadcrumbs without an activeMenuTrail', () => {
  const { container } = render(
    <ReduxProvider initialState={initialState}>
      <HelmetProvider>
        <Component pageUrl={initialProps.preferredUri} items={null} />
      </HelmetProvider>
    </ReduxProvider>,
  );
  expect(container).toMatchSnapshot();
});

test('Should not render breadcrumb-item "people" because no link is set', () => {
  initialProps.activeMenuTrail.edges[0].node.link = null;
  const { container } = render(
    <ReduxProvider initialState={initialState}>
      <HelmetProvider>
        <Component
          pageUrl={initialProps.preferredUri}
          items={initialProps.activeMenuTrail}
        />
      </HelmetProvider>
    </ReduxProvider>,
  );
  expect(container).toMatchSnapshot();
});

test('Should not render breadcrumb-item "people" because no label is set', () => {
  initialProps.activeMenuTrail.edges[0].node.label = null;
  const { container } = render(
    <ReduxProvider initialState={initialState}>
      <HelmetProvider>
        <Component
          pageUrl={initialProps.preferredUri}
          items={initialProps.activeMenuTrail}
        />
      </HelmetProvider>
    </ReduxProvider>,
  );
  expect(container).toMatchSnapshot();
});
