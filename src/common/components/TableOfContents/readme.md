# TableOfContents factory

The TableOfContents factory for creating navigation based on text/section paragraph's headers. Navigation is based on IntersectionObserver

#### Options

| option                        | default                                |
| ----------------------------- | -------------------------------------- |
| `intersectionObserverOptions` | rootMargin: 0px; threshold: [0.2, 0.8] |
| `scrollOffset`                | `100`                                  |
| `styles`                      | -                                      |

#### TableOfContents component props

| prop                 | default | description                                                                                                               |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `headings`           |         | list of headings                                                                                                          |
| `shouldHideContent`  |         | boolean info if article is restricted and content should be hidden                                                        |
| `shouldObserve`      | true    | boolean info if observer should be active (if have multiple TableOfContents in one place only one should do observations) |
| `customScrollOffset` |         | possibility to override scrollOffset option                                                                               |

## Usage

### Putting TableOfContents to article

To have both TableOfContents and Article text next to each other it's best to put it in two different columns using our grid.

Example usage in Beo's ArticleTypeGuide:

```js
<div className={grid.Row}>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColMd7,
              grid.ColXl6,
              grid.HiddenMdDown,
              grid.HideForPrint,
            )}
          >
            <TableOfContents
              headings={navigationHeadings}
              shouldHideContent={shouldHideContent}
            />
          </div>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColMd17,
              grid.ColXl16,
              grid.ColOffsetXl2,
            )}
          >
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColXs24,
                  grid.ColSm20,
                  grid.ColOffsetSm2,
                  grid.ColOffsetMd0,
                  grid.ColMd24,
                  grid.ColXl21,
                )}
              >
                <ArticleHeadGuide
                  article={article}
                  shortTitleFallback="Ratgeber"
                />
              </div>
              <div
                className={classNames(
                  grid.ColXs24,
                  styles.HiddenMdUp,
                  grid.HideForPrint,
                )}
              >
                <TableOfContents // <-------- second tableOfContents if it has to be included inside column of article,
                  shouldObserve={false} // <----- false because second TableOfContents is already observing
                  headings={navigationHeadings}
                  shouldHideContent={shouldHideContent}
                  customScrollOffset={MOBILE_ARTICLE_SCROLL_OFFSET}
                />
              </div>
            </div>
 // ... rest of article

```

IMPORTANT NOTE:

Due to smaller space for article content we have to make sure all paragraphs are displayed correctly.

In some cases we have to remove containers on Paragraph level based on origin. <-- this might be improved in the future

Please pay special attention to paragraphs like Ministages, Teasers, Images, TeaserGrids, ImageGalleries, Listicles, Sections, etc.
