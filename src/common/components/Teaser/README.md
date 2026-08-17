# Teaser Factory

Almost all teasers on SI are using the teaser factory. If you need an inspiration on how to implement a teaser, I suggest to take a look at the SI teasers.

## Factory options

| Parameter                    | Description                                                                                                                                                                                            | Default value |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `icon`                       | A `getIconByProps` function which can be defined by every teaser itself. (see examples below)                                                                                                          | -             |
| `isIconPositionOnImage`      | A boolean or a custom `getIconPositionByProps` function which can be defined by every teaser itself. (see examples below)                                                                              | -             |
| `titleBadge`                 | A `getTitleBadgeByProps` function which can be defined by every teaser itself. (see examples below)                                                                                                    | -             |
| `sponsorImage`               | A `getSponsorImageByProps` function which can be defined by every teaser itself. (see examples below)                                                                                                  | -             |
| `hasPublicationLogo`         | A boolean flag to either show or hide the publication logo                                                                                                                                             | `false`       |
| `isPublicationDateVisible`   | A boolean flag to either show or hide the publicationDate. The date will be rendered as `dd.mm.yyyy`, the formatting can be overwritten by a custom `formattedPublicationDate` function                | `false`       |
| `formattedPublicationDate`   | A `getFormattedPublicationDateByProps` function which can be defined by every teaser itself to change the formatting of the publicationDate. (see examples below)                                      | -             |
| `teaserImageIdentifier`      | A string value used for image lazy-loading                                                                                                                                                             | `''`          |
| `imageOnLoad`                | A `imageOnLoad` function used to replace blurry images onLoad                                                                                                                                          | `noop`        |
| `badge`                      | A `getBadgeByProps` function which can be defined by every teaser itself. (see examples below)                                                                                                         | -             |
| `children`                   | Children elements that will rendered as last node before the closing `</a>`. This can be used as a wildcard element, if you need to put an additional html-element on the teaser. (see examples below) | `null`        |
| `trackingTeaserClickHandler` | A trackingHanlder function that gets called when the user clicks on the teaser                                                                                                                         | `noop`        |
| `teaserImage`                | An object of the type `TeaserFactoryTeaserImage`, that contains: caption, credit, relativeOriginPath, initialThumbnailImage, intialGrayPlaceholderImage, alt                                           | `null`        |
| `fullScreenHashTeaserClick`  | **Currently SI-only**, a string used for tracking. Sets a hash in the url if a teaser (image_gallery), with the flag **openDirectlyInFullscreen**, has been clicked                                    | `''`          |
| `fullScreenHash`             | **Currently SI-only**, a string                                                                                                                                                                        | xxx           |
| `leadOptions`                | An object of the type `TeaserFactoryLeadOptions`, that contains: truncateCount, suffixText. If left empty, the lead will not be displayed eventhogh it is available via props                          | -             |
| `Link`                       | `Link` component form the app                                                                                                                                                                          | -             |
| `innerContent`               | `getInnerContentByProps` component for some custom usages set inside the Link wrapper                                                                                                                  | -             |
| `outerContent`               | `getOuterContentByProps` component for some custom usages set outside the Link wrapper                                                                                                                 | -             |

## How `getByProps` functions work

With `getByProps` functions we have a lot of freedom when it comes to creating a teaser. A `getByProps` function accepts the teaser props in the factory, but the content or return value can be defined in the app itself.

Here is a basic example on how to get **Badge**:

```js
// inside an app for example: BEO or HZ

import teaserFactory from 'Teaser/factory';
import Badge from 'Badge'; // a custom badge component from the app


const getBadgeByProps = ({ badgeColor, badgeLabel }) => {
  return (
    <div className={styles.BadgeWrapper}>
      <Badge label={badgeLasbel} color={badgeColor} />
    </div>
  );
};

export default teaserFactory({
  ...
  badge: getBadgeByProps,
  ...
});
```

The following `teaserFactoryOptions` can be `getByProps` functions:

- `getIconByProps`
- `getIconPositionByProps`
- `getTitleBadgeByProps`
- `getSponsorImageByProps`
- `getFormattedPublicationDateByProps`
- `getBadgeByProps`
- `getInnerContentByProps`
- `getOuterContentByProps`

## Usage examples

Teaser factory call inside of the **APP**:
You probably have to wrap your factory call with `connect` / `mapStateToProps` to connect the windowState from Redux.

```js
import teaserFactory from 'Teaser/factory';
import windowStateSelector from 'selectors/windowStateSelector';
import {
  STYLE_3X2_280,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from 'constants/images';
import styles from './styles.legacy.css';

const teaserImageStyles = {
  style_320: STYLE_3X2_210,
  style_480: STYLE_3X2_210,
  style_540: STYLE_3X2_210,
  style_760: STYLE_3X2_210,
  style_960: STYLE_3X2_210,
  style_1680: STYLE_3X2_440,
};

// all your other getByProps functions go here

const Teaser = teaserFactory({
  styles: {
    ContentWrapper: styles.ContentWrapper,
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
    Lead: styles.Lead,
    BottomLineWrapper: styles.BottomLineWrapper,
    BottomLine: styles.BottomLine,
    PublicationLogo: styles.PublicationLogo,
    ShowMore: styles.ShowMore,
  },
  teaserImageStyles
  badge: getBadgeByProps,
  titleBadge: getTitleBadgeByProps,
  hasPublicationLogo: true,
  isPublicationDateVisible: true,
  formattedPublicationDate: getFormattedPublicationDateByProps,
  sponsorImage: getSponsorImageByProps,
  icon: getIconByProps,
  leadOptions: {
    truncateCount: 190, // use a very high number if you don't need to truncate the lead
    suffixText: 'Mehr...', // leave blank if you don't need a suffixText
  },
  isIconPositionOnImage: true,
});

const mapStateToProps: Function = (state: Object): Object => ({
  windowState: windowStateSelector(state),
});

export default connect(mapStateToProps)(Teaser);
```

## A clean way to handle `getByProps` functions

When implementing multiple teasers for a publication you might have to duplicate some `getByProps` functions, because they use exactly the same markup. This would obiously not be the best solution, here is how you could solve this.

Lets say you have a main teaser that uses a `getBadgeByProps` function:

```js
// main teaser
import teaserFactory from 'Teaser/factory';
import Badge from 'Badge'; // a custom badge component from the app


const getBadgeByProps = ({ badgeColor, badgeLabel }) => {
  return (
    <div className={styles.BadgeWrapper}>
      <Badge label={badgeLasbel} color={badgeColor} />
    </div>
  );
};

export default teaserFactory({
  ...
  badge: getBadgeByProps,
  ...
});
```

But now you want to implement a secondary teaser that uses exactly the same `getBadgeByProps` function. Instead of copy pasting it, you could create a helper file with `getByPropsFactory` functions.

I suggest to create a folder structure like this:

```
<publication>
│   README.md
│   file001.txt
│
└───components
│   │
│   └───Badge
│   │
│   └───Teaser
│       │
│       └───TeaserMain
│       │       index.js
│       │       styles.css
│       │
│       └───TeaserMain
│       │
│       └───shared
│             helpers.js
```

Your `shared/helpers.js` file contains the `getByProps` factories:

```js
// shared/helpers.js

export const getBadgeByPropsFactory =
  (styles) =>
  ({ badgeColor, badgeLabel }) => {
    return (
      <div className={styles.Badge}>
        <Badge label={badgeLasbel} color={badgeColor} />
      </div>
    );
  };
```

All you have to do now, is to call the `getBadgeByPropsFactory` in your main and secondary teaser, pass the styles object as an argument and you're good to go.

```js
// main teaser
import teaserFactory from 'Teaser/factory';
import { getBadgeByPropsFactory } from 'Teaser/shared/helpers';

const getBadgeByProps = getBadgeByPropsFactory(styles);

export default teaserFactory({
  ...
  badge: getBadgeByProps,
  ...
});
```

and

```js
// secondary teaser
import teaserFactory from 'Teaser/factory';
import { getBadgeByPropsFactory } from 'Teaser/shared/helpers';

const getBadgeByProps = getBadgeByPropsFactory(styles);

export default teaserFactory({
  ...
  badge: getBadgeByProps,
  ...
});
```

With this solution there is less duplicated code. If one of your teasers use a different `<Badge />` component, you still have the freedom to add a new `getBadgeByProps` function that will work for your teaser with special requirements.
