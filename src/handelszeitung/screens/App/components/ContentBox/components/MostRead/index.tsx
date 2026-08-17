/* istanbul ignore file */

import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import ContentBoxFactory, {
  ContentBoxPropsInner,
} from '../../../../../../../common/components/ContentBox/factory';
import { noop } from '../../../../../../../shared/helpers/utils';
import { ensureTeaserInterfaceItem } from '../../../Teaser/shared/helpers';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import Teaser from '../../../Teaser';
import Skeleton from '../../../Teaser/components/TeaserText/components/Skeleton';
import { CONTENT_SOURCE_MOST_READ } from '../../../../../../../shared/constants/content';
import {
  PUBLICATION_ENUM_MAPPING,
  PUBLICATION_GROUP_HZ,
} from '../../../../../../../shared/constants/publications';
import {
  TEASER_LAYOUT_SM,
  TEASER_LAYOUT_TEXT,
} from '../../../../../../../shared/constants/teaser';
import { ARTICLE_ASIDE_ORIGIN } from '../../../../screens/ArticlePage/components/ArticlePageAside/constants';
import styles from './styles.legacy.css';
import { ContentBoxProps } from '../../../../../../../common/components/ContentBox/typings';

const MOST_READ_TITLE = 'Most Read';

/* @ts-ignore TODO: TS7031 ->  Binding element 'contentBoxData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const TeaserRenderer = ({ contentBoxData, origin }) => {
  if (!contentBoxData.items && !Array.isArray(contentBoxData.items)) {
    return null;
  }

  const isArticleAsideOrigin = origin === ARTICLE_ASIDE_ORIGIN;

  const teaserLayout =
    (isArticleAsideOrigin && TEASER_LAYOUT_SM) || TEASER_LAYOUT_TEXT;

  return (
    <>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
      {contentBoxData.items.map((item, index) => (
        <div
          key={`content-box-item-${item.node.id}`}
          className={classNames({
            [styles.Divider]: index > 0 && origin !== ARTICLE_ASIDE_ORIGIN,
            [styles.Spacer]: index > 0 && origin === ARTICLE_ASIDE_ORIGIN,
          })}
        >
          <Teaser
            component={teaserLayout}
            contentBoxType={contentBoxData.contentBoxType}
            {...ensureTeaserInterfaceItem(item)}
          />
        </div>
      ))}
    </>
  );
};

const getContentBoxType = ({
  component = CONTENT_SOURCE_MOST_READ,
}: ContentBoxProps) => component;

const getTitleByProps = ({ node, component }: ContentBoxProps) =>
  node.title || (component === CONTENT_SOURCE_MOST_READ ? MOST_READ_TITLE : '');

const getPublicationByProps = ({ publication }: ContentBoxProps) => {
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  return PUBLICATION_ENUM_MAPPING[publication] || PUBLICATION_GROUP_HZ;
};

const getStylesByProps = ({ origin }: ContentBoxProps) => {
  const isArticleAsideOrigin = origin === ARTICLE_ASIDE_ORIGIN;
  return {
    Wrapper: classNames(
      {
        [styles.PulloutWrapper]: origin !== ARTICLE_ASIDE_ORIGIN,
        [styles.NoPadding]: origin === ARTICLE_ASIDE_ORIGIN,
      },
      styles.Wrapper,
    ),
    Title: classNames(styles.Title, {
      [styles.EditorialPicksTitle]: isArticleAsideOrigin,
    }),
  };
};

const MostRead = ContentBoxFactory({
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ contentBoxData, origin } */
  TeaserGridRenderer: () => TeaserRenderer,
  SingleTeaser: Teaser,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(pageSize */
  getContentBoxRowGridOptions: noop,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  teaserLayout: null,
  Skeleton,
  publication: getPublicationByProps,
  contentBoxType: getContentBoxType,
  title: getTitleByProps,
});

const MostReadWrapper = (props: ContentBoxPropsInner) => {
  const publication = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).pageMetadata.publication,
  );

  /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
  return <MostRead {...props} publication={publication} />;
};

export default MostReadWrapper;
