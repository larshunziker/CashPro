import React from 'react';
import { render } from '@testing-library/react';
import factory from '../factory';

const Component = factory();

describe('[Screen] Ranking | RestrictedContent', () => {
  it('Should render without restriction', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const { container } = render(
      <Component isActive={false}>
        <p>{text}</p>
      </Component>,
    );
    expect(container.children[0].textContent).toBe(text);
    expect(container.children[0]).not.toHaveClass('Wrapper');
  });

  it('Should render with restriction and shuffled text', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const { container } = render(
      <Component isActive>
        <p>{text}</p>
      </Component>,
    );
    expect(container.children[0].textContent).not.toBe(text);
    expect(container.children[0]).toHaveClass('Wrapper');
  });

  it('Should keep the same obfuscated text when the parent re-renders', () => {
    const text = 'Stable shuffle test';
    const { container, rerender } = render(
      <Component isActive>
        <p>{text}</p>
      </Component>,
    );
    const first = container.children[0].textContent;
    rerender(
      <Component isActive>
        <p>{text}</p>
      </Component>,
    );
    expect(container.children[0].textContent).toBe(first);
  });

  it('Should render with span wrapper', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const { container } = render(
      <Component isActive tag="span">
        <p className="text-style">AAA</p>
      </Component>,
    );
    expect(container.children[0].textContent).not.toBe(text);
    expect(container).toMatchSnapshot();
  });

  it('Should render without wrapper', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const { container } = render(
      <Component isActive tag="">
        <p className="text-style">AAA</p>
      </Component>,
    );
    expect(container.children[0].textContent).not.toBe(text);
    expect(container).toMatchSnapshot();
  });
});
