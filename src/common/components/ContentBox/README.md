# ContentBox Factory

The Content Box factory is used for Most-Read and Topic-Boxes.

## Props

There are NO mandatory parameters for this component. Without additional input, it will simply
fetch and render the Most-Read Content from the Recommendation-Service.

| Parameter | Description                                                                               | Default value |
| --------- | ----------------------------------------------------------------------------------------- | ------------- |
| `node`    | An object that includes the specific data (e.g. the article ID) for related reco content. | -             |

## Usage

To implement a topic-box or most-read-box, you can render this component with appropriate styles and gridoptions anywhere you like.

ContentBox factory call inside of the **APP**:

```jsx
import { connect } from 'react-redux';
import ContentBoxFactory from 'ContentBox/factory';
import TeaserGrid from 'TeaserGrid';
import Skeleton from 'Teaser/components/TeaserText/components/Skeleton';
import { TEASER_LAYOUT_TEXT, TEASER_LAYOUT_M } from 'Teaser/constants';
import styles from './styles.legacy.css';

const getContentBoxRowGridOptions: Function = (
  pageSize: number,
  teaserType: string = '',
): GridConfig => {
  const type: string = teaserType || TEASER_LAYOUT_M;

  return {
    rows: [...Array(pageSize)].map(() => ({
      items: [{ type }],
      hasContainer: false,
      isGridEnabled: false,
      isMarginDisabled: true,
      hasTeaserDivider: true,
    })),
  };
};

export default
  ContentBoxFactory({
    styles: {
      Wrapper: styles.Wrapper,
      Title: styles.Title,
    },
    TeaserGrid,
    getContentBoxRowGridOptions,
    teaserLayout: TEASER_LAYOUT_TEXT,
    Skeleton,
    publication: 'HZ',
  });

```

Component usage:

```jsx
<ContentBox {...props} />
```
