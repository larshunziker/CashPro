# Brightcove Factory

The Brightcove factory is our video player for all brightcove videos.

Autoplay on **iOS** is only possible if the video is muted.

## Props

| Parameter                       | Description                                                                                          | Default value |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| `video`                         | An object that includes the specific info (e.g. the video ID) for the current video.                 | -             |
| `imageUrl`                      | Image URL to display as a fallback if there is an error or the display if the video didn't play yet. | -             |
| `muted`                         | Boolean value to initially mute the video (essential for autoplay on **iOS**)                        | `false`       |
| `autoPlay`                      | Boolean value to set auto play (this value is ignored if `isObserveForAutoplayEnabled` is set)       | `false`       |
| `isObserveForAutoplayEnabled`   | Boolean value to enable automatic video playback if the video is 50% in the viewport                 | `false`       |
| `hasToLazyLoadBrightcoveScript` | Boolean value to enable lazy loading of the brightcove script (199kb in size)                        | `true`        |

The `autoPlay` and `muted` props will automatically be set and handeled by the factory, if `isObserveForAutoplayEnabled` is enabled.

## Usage

To initialize the brightcove player, you will need an Account and a Player ID which you can get from here: https://studio.brightcove.com/products/videocloud/home

Brightcove factory call inside of the **APP**:

```jsx
import { connect } from 'react-redux';
import {
  STYLE_HEADER_16_9_SMALL,
  STYLE_HEADER_16_9_LARGE,
  STYLE_THUMBNAIL,
} from '../../../shared/constants/images';
import brightcoveFactory from 'Brightcove/factory';
import { BRIGHTCOVE_ACCOUNT_ID, BRIGHTCOVE_PLAYER_ID } from 'App/constants';
import { assembleAkamaiImgUrl, getWidthAndHeightByImageStyle } from '../../../../../common/components/Picture/helpers';
import type { BrightcoveProps } from 'Brightcove/typings';


const Player: Function | null = brightcoveFactory({
  accountId: BRIGHTCOVE_ACCOUNT_ID,
  playerId: BRIGHTCOVE_PLAYER_ID,
  skipButtonDelay: 15,
  overlayAdLabel: 'Anzeige',
  skipButtonLabel: 'Werbung überspringen',
  skipButtonDelayLabel: `Werbung in %s Sek. überspringen`,
});
```

<sub>Check implementation on other publications for a more detailed example</sub>

To enable the JsonLD data you have to call the `createSSRHelmet` function in your application. See example below:

```jsx
import { createSSRHelmet } from 'Brightcove/helpers';
```

Component usage:

```jsx
const VideoPlayer = () => {
  const {width, height} = getWidthAndHeightByImageStyle(STYLE_HEADER_16_9_LARGE)
  const {thumbnailWidth, thumbnailHeight} = getWidthAndHeightByImageStyle(STYLE_THUMBNAIL)
  return (
    <div>
       {createSSRHelmet(
          video,
          assembleAkamaiImgUrl(relativeOriginPath, width, height, focalpointX, focalpointY)
          assembleAkamaiImgUrl(relativeOriginPath, thumbnailWidth, thumbnailHeight, focalpointX, focalpointY)
        )} // JsonLD data
      {video.brightcoveId && (
        <Player
          video={video}
          autoPlay={false}
          muted={true}
          isObserveForAutoplayEnabled={true}
          hasToLazyLoadBrightcoveScript={true}
        />
      )}
    </div>
  );
};
```
