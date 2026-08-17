import React from 'react';
import RelatedContent from '../../../../components/RelatedContent';
import RecommendedContentSection from '../RecommendedContentSection';
import { GRID_LAYOUT_TEASER_3X2 } from '../../../../components/TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';
import { RelatedArticlesSectionProps } from './typings';

// TODO use teaser MD

const RelatedArticlesSection = ({ article }: RelatedArticlesSectionProps) => {
  if (
    (!article?.relatedArticles?.edges ||
      article.relatedArticles.edges.length === 0 ||
      !!article.canonicalUri) &&
    (!article?.channel?.articles?.edges ||
      article.channel.articles.edges.length === 0)
  ) {
    return null;
  }

  return (
    <>
      <div className={styles.OuterWrapper}>
        {(article?.relatedArticles?.edges &&
          article.relatedArticles.edges.length > 0 && (
            <RelatedContent
              teaserGridLayout={GRID_LAYOUT_TEASER_3X2}
              gridOptionType={'title'}
              title="Mehr zum Artikel"
              titleHasContainer={false}
              titleInverted={true}
              relatedContent={article.relatedArticles}
            />
          )) ||
          (article.canonicalUri && (
            <RecommendedContentSection
              article={{
                canonicalUri: article.canonicalUri,
                keywords: article.keywords,
                preferredUri: article.preferredUri,
                relatedArticles: article.relatedArticles,
                gcid: article.gcid,
              }}
              title="Weitere Empfehlungen"
              limit={9}
            />
          )) ||
          null}
      </div>
    </>
  );
};

export default RelatedArticlesSection;
