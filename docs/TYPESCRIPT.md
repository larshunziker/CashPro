# migration to typescript

- 🤩 cheatsheet: <https://github.com/typescript-cheatsheets/react-typescript-cheatsheet>
- 🤓 interesting read (not all rules apply to our stack, there will always be different opinions) <https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680>

---

## 📦 how to migrate a `.js` file

- open the file
- change the extension from `.js` to `.tsx` (all .js files in the component folder, except for `queries.js`)
- remove all `: Function` typings (ts will autodetect the typing, in case of component typings type them as any or use the component typing. Refer to [this post](https://dtc-rasch.slack.com/archives/GD6FRUFAA/p1571302090024400))
- remove all `: Object` typings
- remove all `: Element<any>` typings except if there are props that contain jsx, use `ReactElement` instead (there is an example below)
- remove all `type` words on the imports (`import type {FooBar} from 'xyz'` ⇒ `import {FooBar} from 'xyz'`)
- export all `gql` fragments to `.js` files to avoid building issues
- migrate css as mentioned below or run `yarn css:typedef --path=<relative path to file>` to create typing definition files
- update imports to use relative paths ([VS Code extension](https://marketplace.visualstudio.com/items?itemName=jakob101.RelativePath))
- fix all mentioned/displayed errors
- run `yarn lint` so all files are linted and formatted correctly
- if your file has imports of JS modules which the linter can't resolve, try to use a relative path or add `// @ts-ignore` comment above the import
- if your file has a unit-test containing snapshot tests, make sure you've removed the `*.js.snap` file and just the `*.tsx.snap` file exists
- run `yarn test --coverage` and make sure that everything is green
- continue with all related files 😎

## 👀 search and replace these patterns

```
{| ⇒ {
|} ⇒ }
import type ⇒ import
$ReadonlyArray ⇒ ReadonlyArray
$NonMaybeType ⇒ NonNullable
type Element ⇒ `not needed anymore`

\+(\w+) ⇒ readonly $1
: \?(\w+<?\w*>?) ⇒ : $1 | null | undefined
<\?(\w+)> ⇒ <$1 | null | undefined>
\$PropertyType<(\w+), ('?\w+'?)> ⇒ $1[$2]
```

## Always provide explicit type for `children` Props

```tsx
import { ReactNode } from 'react';

type ComponentProps = {
  children: ReactNode;
};
```

## Typing for jsx elements

```tsx
import { ReactElement } from 'react';

const button = <button>my button</button>;

type ComponentProps = {
  button: ReactElement;
};
```

## Typings for global variables or global state like redux

If you need to add global typings for redux states put them in `src/shared/@types/reduxStates.d.ts` (note the folder structure might change in the future)

Global variables like environment variables can be added here `src/shared/@types/global.d.ts` (see `__SERVER__` for example).

## Typings of components for factories

🚧 By now, we just type components defined in the XYZFactoryOptions as `any` and add a `TODO: add XYZComponent typing here` next to it to refactor it later.

On a component typing:

```tsx
export type LinkProps = {
  className?: string;
  link: Link;
  target?: string;
  style?: any;
  children: ReactNode;
  nofollow?: boolean;
  trackingData?: Array<TrackingData>;
};

export type LinkComponent = (props: LinkProps) => ReactElement;
```

On the factory typing:

```tsx
import { LinkComponent } from '../../../../components/Link/typings';
type MyFactoyOptions = {
  Link: LinkComponent;
};
```

## Don't use `styled-jsx` for now!

## 🚧 files to migrate first

| file                                      | status |
| ----------------------------------------- | ------ |
| AdZone                                    | ✅      |
| AlertItem                                 | ✅     |
| AlertsProfile                             | ✅     |
| AlertList                                 | ✅     |
| AlertsUnsubscribe                         | ✅     |
| AlphabeticNavigation                      | ✅     |
| AlphabeticNavigation/Alphabet             | ✅     |
| AlphabeticNavigation/AlphabetOverlay      | ✅     |
| AppNexus                                  | ✅     |
| AppNexusProvider                          | ✅     |
| AppSetup                                  | ✅     |
| Auth0Provider                             | ✅     |
| BackgroundFetchProvider                   | ✅     |
| Badge                                     | ✅     |
| Breadcrumbs                               | ✅     |
| Brightcove                                | ✅     |
| Button                                    | ✅     |
| Comments                                  | ✅     |
| Comments/Comment                          | ✅     |
| Comments/CommentBody                      | ✅     |
| Comments/CommentForm                      | ✅     |
| Comments/Commenting                       | ✅     |
| Comments/CommentReplies                   | ✅     |
| Comments/CommentReply                     | ✅     |
| Comments/CommentReplyForm                 | ✅     |
| Comments/CommentReplyLink                 | ✅     |
| Comments/CommentSetUsernameForm           | ✅     |
| Comments/CommentSort                      | ✅     |
| ContentBox                                | ✅     |
| EditButtons                               | ✅     |
| ErrorBoundary                             | ✅     |
| ExpansionPanel                            | ✅     |
| Header                                    | ✅      |
| Helmet                                    | ✅     |
| Icon                                      | ✅     |
| ImageCaption                              | ✅     |
| InView                                    | ✅     |
| LazyImg                                   | ✅     |
| Link                                      | ✅     |
| LoadingSpinner                            | ✅     |
| LoginForm                                 | ✅     |
| ModalOverlay                              | ✅     |
| MonsterSky                                | ✅     |
| NavigationUserMenu                        | ✅     |
| NoItems                                   | ✅     |
| OneSignalProvider                         | ✅      |
| Pager                                     | ✅      |
| Paragraphs                                | ✅     |
| Paragraphs/BlockquoteParagraph            | ✅     |
| Paragraphs/EmbedParagraph                 | ✅     |
| Paragraphs/EntityQueueParagraph           | ✅     |
| Paragraphs/InfoBoxParagraph               | ✅     |
| Paragraphs/LinkBoxParagraph               | ✅     |
| Paragraphs/MinistageParagraph             | ✅     |
| Paragraphs/ParallaxImageParagraph         | ✅     |
| Paragraphs/RankingListParagraph           | ✅     |
| Paragraphs/TeaserStageParagraph           | ✅     |
| Paragraphs/VideoParagraph                 | ✅     |
| Paragraphs/WebformParagraph               | ✅     |
| PartnerBanner                             | ✅     |
| PianoProvider                             | ✅     |
| Recommendations                           | ✅     |
| Recommendations/ArticleRecommendations    | ✅     |
| Recommendations/RecommendedContentSection | ✅     |
| RelatedContent                            | ✅     |
| ScrollToTop                               | ✅     |
| SearchForm                                | -      |
| SearchForm/Autocomplete                   | -      |
| ShareLink                                 | ✅     |
| Slider                                    | ✅     |
| Slider/CSSSlide                           | ✅     |
| Slider/SlideBuffer                        | ✅     |
| Slider/SlideLabel                         | ✅     |
| Slider/SliderNavigation                   | ✅     |
| Slider/SliderProgressBar                  | ✅     |
| Slider/SwipeIndicator                     | ✅     |
| SocialMediaBar                            | ✅     |
| SmoothScroll                              | ✅     |
| SponsorBanner                             | ✅     |
| SponsorImage                              | ✅     |
| StrictMode                                | ✅      |
| SubscribeButton                           | ✅     |
| SwipeInteractionButton                    | ✅     |
| Tealium                                   | -      |
| Teaser                                    | ✅     |
| Teaser/Channel                            | ✅     |
| Teaser/Special                            | ✅     |
| Teaser/SpecialStage                       | ✅     |
| Teaser/TeaserText                         | ✅     |
| TermsOverview                             | ✅     |
| TermsOverview/ElementList                 | ✅     |
| VideoStage                                | ✅     |
| useInView                                 | ✅     |
| entry/client                              | ✅     |
