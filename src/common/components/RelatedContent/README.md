# RelatedContent Factory

The RelatedContent is able to render any type of related content.
It expects to receive an array of related content teasers.

Since we are in the process of moving all apps to the flexbox grid, we had to update this factory to make it works for GM and all the other publicaitons.

## Usage

RelatedContent Component usage on **GM**:

```html
 <RelatedContent
    getGridOptions={getGridOptions}
    gridOptionType={'title'}
    title={this.props.title}
    relatedContent={ensureTeaserInterface(this.state.recommendations)}
    outerWrapperClass={this.props.outerWrapperClass}
    titleInverted={true}
   />
```

RelatedContent factory binding file inside of the **APP**:

```jsx
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import windowStateSelector from 'selectors/windowStateSelector';
import RelatedContentFactory, {
  type RelatedContentPropsInner,
} from 'RelatedContent/factory';
import TeaserGrid from 'TeaserGrid';
import Pager from 'Pager';
import type { RelatedContentFactoryOptionsStyles } from 'RelatedContent/typings';
import styles from './styles.legacy.css';

const getTeaserGridByProps: Function = ({
  teaserGridOptions,
  relatedContent,
}: RelatedContentPropsInner): TeaserGrid => {
  if (!teaserGridOptions) {
    return null;
  }
  return <TeaserGrid gridConfig={teaserGridOptions} items={relatedContent} />;
};

const mapStateToProps: Function = (state: Object): Object => ({
  windowState: windowStateSelector(state),
});

export default connect(mapStateToProps)(
  RelatedContentFactory({
    teaserGrid: getTeaserGridByProps,
    Pager,
    styles: {
      Wrapper: styles.Wrapper,
      // add the rest of your css classes here as well
    },
  }),
);
```

RelatedContent Component usage:

```jsx
import { getGridConfig } from 'TeaserGrid/shared/gridConfig';

return (
  <RelatedContent
    teaserGridOptions={getGridConfig(
      GRID_LAYOUT_RELATED_CONTENT, // grid layout constant
      viewportLabel, // windowState.viewport.label
    )}
    gridOptionType={'title'}
    title="Mehr zum Artikel"
    titleHasContainer={true}
    titleInverted={true}
    relatedContent={ensureTeaserInterface(article.relatedArticles.edges)}
  />
);
```
