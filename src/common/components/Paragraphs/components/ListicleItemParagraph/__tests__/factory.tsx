import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

jest.mock('../../../../SmoothScroll');

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  componentFactoryOptions = {
    styles: {
      Title: 'TitleClassName',
      Content: 'ContentClassName',
      ContentBox: 'ContentBoxClassName',
      Footer: 'FooterClassName',
      ImageBox: 'ImageBoxClassName',
      ImageBoxFirst: 'ImageBoxFirstClassName',
      Image: 'ImageClassName',
      Even: 'EvenClassName',
      Odd: 'OddClassName',
      Wrapper: 'WrapperClassName',
      ListicleItemWrapper: 'ListicleItemWrapperClassName',
      ListicleItemInnerWrapper: 'ListicleItemInnerWrapperClassName',
      InnerWrapper: 'InnerWrapperClassName',
    },
  };
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialState = {};
});

describe('[Common] Paragraphs - ListicleItemParagraph', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 0;
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    const title = queryByTestId('listicleitemparagraph-title');
    const text = queryByTestId('listicleitemparagraph-text');
    const footer = queryByTestId('listicleitemparagraph-footer');
    const wrapper = queryByTestId('listicleitemparagraph-content-wrapper');
    expect(title).not.toBeNull();
    expect(text).not.toBeNull();
    expect(wrapper).not.toBeNull();
    expect(footer).not.toBeNull();
  });

  it('Should render even items correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 0;
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    const innerWrapper = queryByTestId('listicleitemparagraph-inner-wrapper');
    const wrapper = queryByTestId('listicleitemparagraph-content-wrapper');
    expect(wrapper).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(wrapper.classList.contains('EvenClassName')).toBeTruthy();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(wrapper.classList.contains('OddClassName')).not.toBeTruthy();
    //@ts-ignore
    expect(innerWrapper.firstChild).toHaveClass('ImageBoxClassName');
    //@ts-ignore
    expect(innerWrapper.firstChild).not.toHaveClass('ContentBoxClassName');
  });

  it('Should render odd items correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 1;
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    const wrapper = queryByTestId('listicleitemparagraph-content-wrapper');
    const innerWrapper = queryByTestId('listicleitemparagraph-inner-wrapper');
    expect(wrapper).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(wrapper.classList.contains('EvenClassName')).not.toBeTruthy();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(wrapper.classList.contains('OddClassName')).toBeTruthy();
    //@ts-ignore
    expect(innerWrapper.firstChild).toHaveClass('ContentBoxClassName');
    //@ts-ignore
    expect(innerWrapper.firstChild).not.toHaveClass('ImageBoxClassName');
  });

  it('Should not render footer when no footer given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleItem.footer = '';
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    const wrapper = queryByTestId('listicleitemparagraph-content-wrapper');
    const footer = queryByTestId('listicleitemparagraph-footer');
    expect(wrapper).not.toBeNull();
    expect(footer).toBeNull();
  });

  it('Should not render title when no title given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleItem.title = '';
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    const wrapper = queryByTestId('listicleitemparagraph-content-wrapper');
    const title = queryByTestId('listicleitemparagraph-title');
    expect(wrapper).not.toBeNull();
    expect(title).toBeNull();
  });

  it('Should not render text when no text given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleItem.text = '';
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );

    const wrapper = queryByTestId('listicleitemparagraph-content-wrapper');
    const text = queryByTestId('listicleitemparagraph-text');
    expect(wrapper).not.toBeNull();
    expect(text).toBeNull();
  });
});
