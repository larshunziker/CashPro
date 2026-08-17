import { act, render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import * as helpers from '../helpers';

jest.mock('smoothscroll-polyfill', () => ({
  polyfill: jest.fn(),
}));

const defaultProps = {
  anchorId: 'comments',
  offset: 120,
};

describe('[Common] SmoothScroll', () => {
  const originalHash = window.location.hash;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    window.history.replaceState({}, '', '/article');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    window.history.replaceState({}, '', `/article${originalHash || ''}`);
    document.body.innerHTML = '';
  });

  it('Should not render factory', () => {
    const Component = componentFactory();
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('smooth-scroll-factory-wrapper')).toBeNull();
  });

  it('Should render factory correctly', () => {
    const Component = componentFactory();
    const { queryByTestId } = render(<Component {...defaultProps} />);
    expect(queryByTestId('smooth-scroll-factory-wrapper')).not.toBeNull();
  });

  it('Should scroll to hash on mount even without matching anchor links', () => {
    const scrollSpy = jest
      .spyOn(helpers, 'scrollToAnchorElement')
      .mockImplementation(() => undefined);
    window.history.replaceState({}, '', '/article#comments');

    const Component = componentFactory();
    render(<Component {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith(
      'comments',
      expect.objectContaining({
        offset: 120,
      }),
    );

    scrollSpy.mockRestore();
  });

  it('Should not re-scroll to hash on updates so user scroll is not blocked', () => {
    const scrollSpy = jest
      .spyOn(helpers, 'scrollToAnchorElement')
      .mockImplementation(() => undefined);
    window.history.replaceState({}, '', '/article#comments');

    const commentsLink = document.createElement('a');
    commentsLink.setAttribute('href', '#comments');
    document.body.appendChild(commentsLink);

    const Component = componentFactory();
    const { rerender } = render(<Component {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).toHaveBeenCalledTimes(1);

    rerender(<Component {...defaultProps} offset={140} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).toHaveBeenCalledTimes(1);

    scrollSpy.mockRestore();
  });

  it('Should not auto-scroll when location hash does not match anchor', () => {
    const scrollSpy = jest
      .spyOn(helpers, 'scrollToAnchorElement')
      .mockImplementation(() => undefined);
    window.history.replaceState({}, '', '/article');

    const Component = componentFactory();
    render(<Component {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).not.toHaveBeenCalled();

    scrollSpy.mockRestore();
  });

  it('Should scroll to hash when anchorId becomes available after mount', () => {
    const scrollSpy = jest
      .spyOn(helpers, 'scrollToAnchorElement')
      .mockImplementation(() => undefined);
    window.history.replaceState({}, '', '/article#comments');

    const Component = componentFactory();
    const { rerender, queryByTestId } = render(
      <Component anchorId="" offset={120} />,
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(queryByTestId('smooth-scroll-factory-wrapper')).toBeNull();

    rerender(<Component {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith(
      'comments',
      expect.objectContaining({
        offset: 120,
      }),
    );

    rerender(<Component {...defaultProps} offset={140} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).toHaveBeenCalledTimes(1);

    scrollSpy.mockRestore();
  });

  it('Should clear pending timeout when anchorId becomes empty', () => {
    const scrollSpy = jest
      .spyOn(helpers, 'scrollToAnchorElement')
      .mockImplementation(() => undefined);
    window.history.replaceState({}, '', '/article#comments');

    const commentsLink = document.createElement('a');
    commentsLink.setAttribute('href', '#comments');
    document.body.appendChild(commentsLink);

    const Component = componentFactory();
    const { rerender } = render(<Component {...defaultProps} />);

    rerender(<Component anchorId="" offset={120} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(scrollSpy).not.toHaveBeenCalled();

    scrollSpy.mockRestore();
  });
});
