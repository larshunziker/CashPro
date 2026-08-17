import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import { TRACKING_CLASS_ARTICLE_KEYWORDS } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ArticleKeywordsProps } from './typings';

type ArticleKeywordsPropsInner = ArticleKeywordsProps & {
  renderNavigationLinks: (item: KeywordEdge, index: number) => ReactElement;
};

const doRenderNavigationLinks = (item: KeywordEdge, index: number) => {
  if (!item || !item.node || !item.node.preferredUri || !item.node.label) {
    return null;
  }

  return (
    <span
      className={styles.ListItem}
      key={`navigation-link-${
        item.node.label || item.node.preferredUri || index
      }`}
    >
      <Link
        path={item.node.preferredUri.toLocaleLowerCase()}
        className={styles.Link}
        label={item.node.label}
      />
    </span>
  );
};

const ArticleKeywords = ({
  keywords,
  colStyle,
  renderNavigationLinks,
}: ArticleKeywordsPropsInner) => (
  <div
    className={classNames(
      TRACKING_CLASS_ARTICLE_KEYWORDS,
      'keywords',
      styles.Wrapper,
      colStyle,
    )}
  >
    <span className={styles.Header}>
      <FormattedMessage
        id="app.article.keywords"
        description="How the word keywords is translated as a title"
        defaultMessage="Stichworte"
      />
    </span>
    {keywords?.edges?.map(renderNavigationLinks)}
  </div>
);

const extendWithHandlers = withHandlers({
  renderNavigationLinks: () => (item: KeywordEdge, index: number) =>
    doRenderNavigationLinks(item, index),
});

export default compose<any, any>(extendWithHandlers)(ArticleKeywords);
