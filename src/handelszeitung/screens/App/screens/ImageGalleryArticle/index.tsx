import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../shared/helpers/withHelmet';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../src/shared/decorators/withCommentsHandlers'. '/Users/bh */
import withCommentsHandlers from '../../../../../../src/shared/decorators/withCommentsHandlers';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../../src/shared/actions/header';
import EditButtons from '../../components/EditButtons';
import ImageGalleryParagraph from '../../components/Paragraphs/components/ImageGalleryParagraph';
import RelatedContent from '../../components/RelatedContent';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import ArticleHeader from '../Article/components/ArticleHeader';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_3X2 } from '../../components/TeaserGrid/gridConfigs/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

const getFallbackTitle = () => 'Image Gallery Article';

const ImageGalleryArticle = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'imageGalleryArticle' implicitly has an 'any' type. */
  imageGalleryArticle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setHeaderData' implicitly has an 'any' type. */
  setHeaderData,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'resetHeaderData' implicitly has an 'any' type. */
  resetHeaderData,
}) => {
  const { gcid, channel, preferredUri, title, shortTitle, lead, __typename } =
    imageGalleryArticle;

  useEffect(() => {
    setHeaderData({
      articleData: {
        gcid,
        title,
        shortTitle,
        lead,
        channel,
        preferredUri,
        commentStatus: '',
        subtypeValue: '',
        socialMediaTitle: '',
      },
      contentType: __typename,
    });
    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    gcid,
    channel,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    title,
    shortTitle,
    lead,
  ]);

  if (!imageGalleryArticle || !imageGalleryArticle.id) {
    return null;
  }

  return (
    <div
      className={`image-gallery-article ${styles.Wrapper}`}
      data-testid="image-gallery-article-wrapper"
    >
      <EditButtons
        editContentUri={imageGalleryArticle.editContentUri}
        editRelationUri={imageGalleryArticle.editRelationUri}
        cloneContentUri={imageGalleryArticle.cloneContentUri}
      />

      <ArticleHeader article={imageGalleryArticle} />
      {imageGalleryArticle.body && (
        <div
          className={classNames(
            sections.Section,
            styles.ImageGalleryParagraphWrapper,
            getRestrictedClassName(imageGalleryArticle.__typename),
          )}
          data-testid="image-gallery-article-paragraph-wrapper"
        >
          <div className={sections.Container}>
            <div className={styles.Clearfix}>
              <ImageGalleryParagraph
                gallery={{
                  gallery: {
                    items: imageGalleryArticle.body,
                    id: imageGalleryArticle.id,
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}

      {imageGalleryArticle?.keywords?.edges &&
        Array.isArray(imageGalleryArticle.keywords.edges) &&
        imageGalleryArticle.keywords.edges.length > 0 && (
          <div
            className={grid.Container}
            data-testid="image-gallery-article-articlefooter-wrapper"
          >
            <ArticleAlerts items={imageGalleryArticle?.keywords?.edges} />
          </div>
        )}

      {imageGalleryArticle?.relatedGalleries?.edges?.length > 0 && (
        <div
          className={sections.Section}
          data-testid="image-gallery-article-relatedcontent-wrapper"
        >
          <RelatedContent
            teaserGridLayout={GRID_LAYOUT_TEASER_3X2}
            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function | undefined'. */
            teaserGridOptions={null}
            gridOptionType={'dotted'}
            title={`Weitere Bildergalerien`}
            relatedContent={imageGalleryArticle.relatedGalleries}
          />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

const ImageGalleryArticleWrapper = compose<any, any>(
  connect(null, mapDispatchToProps),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.imageGalleryArticle,
    getImage: (mapProps) =>
      mapProps.imageGalleryArticle?.body?.[0]?.image?.file,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) => (!!mapProps && getFallbackTitle()) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  }),
  withCommentsHandlers,
)(ImageGalleryArticle);

export default ImageGalleryArticleWrapper;
