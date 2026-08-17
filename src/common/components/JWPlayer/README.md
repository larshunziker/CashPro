# JWPlayer Factory

The JWPlayer factory follows the same usage pattern as the Brightcove factory and is intended for gradual migration.

## Defaults and required options

- `endpoint` defaults to `https://cdn.jwplayer.com/libraries`
- `playerId` is **required** and must be set to a valid JW Player ID (not `YOUR_PLAYER_ID`)


## Props

| Parameter | Description | Default value |
| --- | --- |---------------|
| `video` | Current video object with `jwPlayerId` and image metadata | -             |
| `muted` | Initial mute state for JWPlayer setup | `true`        |
| `autoPlay` | Controls autoplay when observation is disabled (`autostart: true/false`). | `true`        |
| `isObserveForAutoplayEnabled` | Enables viewport-based autoplay setup | `false`       |

## Factory usage

```tsx
import jwPlayerFactory from 'JWPlayer/factory';

const Player = jwPlayerFactory({
  endpoint: 'https://cdn.jwplayer.com/libraries',
  playerId: 'YOUR_REAL_PLAYER_ID',
});
```

## Component usage

```tsx
<Player
  video={video}
  autoPlay={false}
  muted={false}
/>

{/* With viewport-based autoplay */}
<Player
  video={video}
  autoPlay={true}
  isObserveForAutoplayEnabled={true}
/>
```

## Notes

### API contract

- The factory initializes the player with playlist URL: `https://cdn.jwplayer.com/v2/media/<jwPlayerId>`.
- The factory uses `@jwplayer/jwplayer-react` and passes the JW script URL via `library`.
- The player `library` URL is built as `<endpoint>/<playerId>.js`.

### Runtime behavior

- A fallback poster is rendered until player initialization succeeds.
- `autostart` uses `'viewable'` only when `isObserveForAutoplayEnabled` is `true`; otherwise it uses the boolean value of `autoPlay`.
- `mute` is effectively forced to `true` when `autoPlay` or `isObserveForAutoplayEnabled` is enabled.
- If `playerId` is missing or set to `YOUR_PLAYER_ID`, the component renders an error state instead of initializing JWPlayer.

