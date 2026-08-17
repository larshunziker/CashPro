import React, { ComponentType, Suspense, lazy } from 'react';
import classNames from 'classnames';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';
import Paragraphs from '../../../../components/Paragraphs';
import ImageHero from './components/ImageHero/';
import {
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { TRACKING_CLASS_CONTENT_HERO } from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleHeroProps } from './typings';

const ImageGalleryHero = lazy(
  () =>
    import(
      /* webpackChunkName: "ImageGalleryHero" */ './components/ImageGalleryHero'
    ),
);

type ArticleHeroPropsInner = ArticleHeroProps & {
  article: {
    heroImageBody: [ImageGalleryParagraph | ImageParagraph | VideoParagraph];
  };
};

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const ArticleHero: ComponentType<ArticleHeroProps> = ({
  article,
  origin,
}: ArticleHeroPropsInner) => {
  const articleHeroImage = article?.heroImageBody?.[0] || null;

  switch (articleHeroImage.__typename) {
    case IMAGE_GALLERY_PARAGRAPH:
      return (
        <div
          className={classNames(
            TRACKING_CLASS_CONTENT_HERO,
            grid.Container,
            styles.ImageGalleryContainer,
          )}
        >
          <div className={classNames(grid.Row, styles.ImageGalleryRowMobile)}>
            <div className={grid.ColSm24}>
              <ClientSideOnly>
                <Suspense fallback={<SuspenseFallback />}>
                  <ImageGalleryHero gallery={articleHeroImage.gallery} />
                </Suspense>
              </ClientSideOnly>
            </div>
          </div>
        </div>
      );
    case VIDEO_PARAGRAPH:
      return (
        <div
          className={classNames(TRACKING_CLASS_CONTENT_HERO, grid.Container)}
        >
          <Paragraphs
            pageBody={article.heroImageBody}
            origin={origin}
            hasContainer={false}
          />
        </div>
      );
    case IMAGE_PARAGRAPH:
    default:
      return (
        <div className={TRACKING_CLASS_CONTENT_HERO}>
          {/* @ts-ignore TODO: TS2322 ->  Type 'ImageParagraph | VideoParagraph | ImageGalleryParagraph' is not assignable to type 'ImageParagraph'. */}
          <ImageHero articleHeroImage={articleHeroImage} />
        </div>
      );
  }
};

export default ArticleHero;
