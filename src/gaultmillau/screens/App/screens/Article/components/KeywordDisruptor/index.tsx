import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { KeywordDisruptorProps } from './typings';

type KeywordDisruptorPropsInner = KeywordDisruptorProps & {
  language: string;
};

const renderKeywordImage = (list: KeywordEdge[], language: string) => {
  const keywordsWithImages = list.filter(
    ({ node }) => node && node.image && node.image.source,
  );

  // no taxonomy found with an image
  if (keywordsWithImages.length < 1) {
    return null;
  }

  // just render first item as defined
  const { node = {} } = keywordsWithImages[0];
  const prefix = language === 'fr' ? 'fr/search/' : 'suche/';
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const path = node.label
    ? /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      `/${prefix}${encodeURIComponent(node.label.toLowerCase())}`
    : null;

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
    <Link path={path} className={styles.KeywordLink}>
      <img
        className={styles.KeywordDisruptor}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string | undefined'. */
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        src={node.image && node.image.source && node.image.source}
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        alt={node.label || ''}
      />
    </Link>
  );
};

const KeywordDisruptor = ({
  keywords,
  addClass = '',
  language,
}: KeywordDisruptorPropsInner) => {
  const itemsJsx =
    (keywords.edges &&
      keywords.edges.length > 0 &&
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<KeywordEdge>[]' is not assignable to parameter of type 'KeywordEdge[]'. */
      renderKeywordImage(keywords.edges, language)) ||
    null;
  return (
    <div
      className={classNames('article-keyword-disruptor', {
        [styles.KeywordWrapper]: itemsJsx !== null,
        [addClass]: !!addClass,
      })}
    >
      {itemsJsx}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  language: settingsStateSelector(state).language,
});

export default compose<any, any>(connect(mapStateToProps))(KeywordDisruptor);
