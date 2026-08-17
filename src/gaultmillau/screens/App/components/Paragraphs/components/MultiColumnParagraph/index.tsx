import React from 'react';
import classNames from 'classnames';
import ParagraphsRenderer from '../ParagraphsRenderer';
import { ARTICLE_TYPE_HEADLESS } from '../../../../../../../shared/constants/content';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_MULTI_COLUMN_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MultiColumnParagraphProps } from './typings';

const MULTI_COLUMN_STYLE_3_COLUMNS = 'three_column';

export const MULTI_COLUMN_TYPE = 'multi-column-type';

const MultiColumnParagraph = ({
  multiColumn,
  addClass = '',
  origin,
}: MultiColumnParagraphProps) => {
  if (!multiColumn || !multiColumn.body || multiColumn.body.length === 0) {
    return null;
  }

  const featuredColStyle = classNames(grid.ColXs24, {
    [grid.ColSm22]: origin === ARTICLE_TYPE_HEADLESS,
    [grid.ColOffsetSm1]: origin === ARTICLE_TYPE_HEADLESS,
  });

  const articleColStyle = classNames(grid.ColSm21, grid.ColOffsetSm1, {
    [grid.ColXl18]: multiColumn.style !== MULTI_COLUMN_STYLE_3_COLUMNS,
    [grid.ColOffsetXl3]: multiColumn.style !== MULTI_COLUMN_STYLE_3_COLUMNS,
    [grid.ColXl24]: multiColumn.style === MULTI_COLUMN_STYLE_3_COLUMNS,
    [grid.ColOffsetXl0]: multiColumn.style === MULTI_COLUMN_STYLE_3_COLUMNS,
  });

  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MULTI_COLUMN_PARAGRAPH,
        styles.Container,
      )}
    >
      <div className={grid.Row}>
        <div
          className={classNames({
            [articleColStyle]: !multiColumn.featured,
            [featuredColStyle]: multiColumn.featured,
          })}
        >
          <div className={classNames({ [grid.Row]: !multiColumn.featured })}>
            <div
              className={classNames('multi-column-paragraph', styles.Wrapper, {
                [addClass]: !!addClass,
              })}
            >
              {multiColumn.body &&
                multiColumn.body.map((paragraph) => (
                  <MultiColumnParagraphComponent
                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                    key={`multi-column-paragraph-${paragraph.id}`}
                    paragraph={paragraph}
                    style={multiColumn.style}
                    origin={origin}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'paragraph' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'style' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const MultiColumnParagraphComponent = ({ paragraph, style, origin }) => {
  const hasMultiColumnStyleThree = style && style.indexOf('three') !== -1;

  return (
    <div
      id={paragraph.anchorId || ''}
      className={classNames({
        [grid.ColSm8]: hasMultiColumnStyleThree,
        [grid.ColSm12]: !hasMultiColumnStyleThree,
        [styles.SmallerCol]: origin === ARTICLE_TYPE_HEADLESS,
      })}
    >
      <ParagraphsRenderer
        pageBody={[paragraph]}
        origin={MULTI_COLUMNS_PARAGRAPH}
        hasContainer={false}
      />
    </div>
  );
};

export default MultiColumnParagraph;
