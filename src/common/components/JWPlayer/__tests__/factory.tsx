import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import componentFactory, { getErrorMessage } from '../factory';
import SSRContextProvider from '../../SSRContext';
import type { JWPlayerProps } from '../typings';

const mockJWPlayerReact = jest.fn((props: Record<string, any>) => {
  return (
    <div data-testid="jwplayer-react" id={props.id}>
      <div className="jw-aspect" />
    </div>
  );
});

jest.mock('@jwplayer/jwplayer-react', () => {
  return (props: Record<string, any>) => mockJWPlayerReact(props);
});

jest.mock('../../CSSPicture', () => {
  return ({
    children,
  }: {
    children: (opts: { className: string }) => React.ReactNode;
  }) => (
    <div data-testid="mocked-csspicture">{children({ className: '' })}</div>
  );
});

const FACTORY_OPTIONS = {
  endpoint: 'https://cdn.jwplayer.com/libraries',
  playerId: 'testPlayerId',
};

const VIDEO_FIXTURE = { jwPlayerId: 'abc123' } as JWPlayerProps['video'];

const getLastJWPlayerReactProps = (): Record<string, any> => {
  const call =
    mockJWPlayerReact.mock.calls[mockJWPlayerReact.mock.calls.length - 1];
  return call?.[0] || {};
};

const renderWithEffects = async (ui: React.ReactElement) => {
  let result!: ReturnType<typeof render>;
  await act(async () => {
    result = render(ui);
    await Promise.resolve();
  });
  return result;
};

beforeEach(() => {
  mockJWPlayerReact.mockClear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('[Common] JWPlayer — factory', () => {
  it('returns expected error messages', () => {
    expect(getErrorMessage('jwplayerError/script-loading')).toBe(
      'JW Player script could not be loaded.',
    );
    expect(getErrorMessage('jwplayerError/unknown')).toBe(
      'An unknown JW Player error occurred.',
    );
    expect(getErrorMessage('other')).toBe(
      'An unknown JW Player error occurred.',
    );
  });

  it('renders null when video.jwPlayerId is missing', () => {
    const Component = componentFactory(FACTORY_OPTIONS);
    const { container } = render(
      <SSRContextProvider>
        <Component video={{} as JWPlayerProps['video']} />
      </SSRContextProvider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('shows loading initially', () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    const { getByText } = render(
      <SSRContextProvider>
        <Component video={VIDEO_FIXTURE} />
      </SSRContextProvider>,
    );

    expect(getByText('loading...')).toBeDefined();
  });

  it('shows script-loading error for invalid playerId', async () => {
    const Component = componentFactory({ ...FACTORY_OPTIONS, playerId: '' });

    const { getByTestId } = await renderWithEffects(
      <SSRContextProvider>
        <Component video={VIDEO_FIXTURE} />
      </SSRContextProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('error-message-container').textContent).toBe(
        'JW Player script could not be loaded.',
      );
    });
  });

  it('uses viewable autostart when autoplay observation is enabled', async () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    await renderWithEffects(
      <SSRContextProvider>
        <Component
          video={VIDEO_FIXTURE}
          autoPlay={true}
          isObserveForAutoplayEnabled={true}
        />
      </SSRContextProvider>,
    );

    await waitFor(() => {
      expect(getLastJWPlayerReactProps()).toEqual(
        expect.objectContaining({
          autostart: 'viewable',
          playlist: 'https://cdn.jwplayer.com/v2/media/abc123',
          library: 'https://cdn.jwplayer.com/libraries/testPlayerId.js',
        }),
      );
    });
  });

  it('uses autoPlay value as autostart when observation is disabled and autoPlay is true', async () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    await renderWithEffects(
      <SSRContextProvider>
        <Component
          video={VIDEO_FIXTURE}
          autoPlay={true}
          isObserveForAutoplayEnabled={false}
        />
      </SSRContextProvider>,
    );

    await waitFor(() => {
      expect(getLastJWPlayerReactProps()).toEqual(
        expect.objectContaining({ autostart: true, mute: true }),
      );
    });
  });

  it('keeps autostart viewable when autoplay is disabled but observation is enabled', async () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    await renderWithEffects(
      <SSRContextProvider>
        <Component
          video={VIDEO_FIXTURE}
          autoPlay={false}
          isObserveForAutoplayEnabled={true}
        />
      </SSRContextProvider>,
    );

    await waitFor(() => {
      expect(getLastJWPlayerReactProps()).toEqual(
        expect.objectContaining({ autostart: 'viewable', mute: true }),
      );
    });
  });

  it('honors muted false when autoplay is disabled', async () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    await renderWithEffects(
      <SSRContextProvider>
        <Component
          video={VIDEO_FIXTURE}
          autoPlay={false}
          muted={false}
          isObserveForAutoplayEnabled={false}
        />
      </SSRContextProvider>,
    );

    await waitFor(() => {
      expect(getLastJWPlayerReactProps()).toEqual(
        expect.objectContaining({ autostart: false, mute: false }),
      );
    });
  });

  it('sizes the player to the wrapper height', async () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    const { container } = await renderWithEffects(
      <SSRContextProvider>
        <Component video={VIDEO_FIXTURE} />
      </SSRContextProvider>,
    );

    await waitFor(() => {
      const jwPlayerRoot = container.querySelector('[id^="jwplayer-abc123-"]');

      expect(getLastJWPlayerReactProps()).toEqual(
        expect.objectContaining({
          height: '100%',
          width: '100%',
        }),
      );
      expect(getLastJWPlayerReactProps()).not.toHaveProperty('aspectratio');
      expect(jwPlayerRoot).not.toBeNull();
      expect((jwPlayerRoot as HTMLElement).style.position).toBe('absolute');
      expect((jwPlayerRoot as HTMLElement).style.inset).toBe('0');
      expect((jwPlayerRoot as HTMLElement).style.width).toBe('100%');
      expect((jwPlayerRoot as HTMLElement).style.height).toBe('100%');
      expect((jwPlayerRoot as HTMLElement).style.overflow).toBe('hidden');

      const aspectSpacer = jwPlayerRoot?.querySelector('.jw-aspect');
      expect(aspectSpacer).not.toBeNull();
      expect((aspectSpacer as HTMLElement).style.display).toBe('none');
    });
  });

  it('generates unique DOM ids for multiple instances', () => {
    const Component = componentFactory(FACTORY_OPTIONS);

    const { container } = render(
      <SSRContextProvider>
        <>
          <Component video={VIDEO_FIXTURE} />
          <Component video={VIDEO_FIXTURE} />
        </>
      </SSRContextProvider>,
    );

    const ids = Array.from(
      container.querySelectorAll('[id^="jwplayer-abc123-"]'),
    ).map((node) => node.id);

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});
