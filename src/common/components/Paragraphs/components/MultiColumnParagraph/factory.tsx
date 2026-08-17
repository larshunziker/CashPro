import React from 'react';
import classNames from 'classnames';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_MULTI_COLUMN_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  MultiColumnParagraphEntry,
  MultiColumnParagraphFactoryOptions,
  MultiColumnParagraphFactoryOptionsStyles,
  MultiColumnParagraphProps,
} from './typings';

type MultiColumnParagraphPropsInner = MultiColumnParagraphProps;

const multiColumnParagraphFactory = ({
  paragraphsRenderer,
  styles: appStyles,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  getGridColsByProps = () => null,
}: MultiColumnParagraphFactoryOptions) => {
  const MultiColumnParagraph = (props: MultiColumnParagraphPropsInner) => {
    const { multiColumnParagraph } = props;

    if (
      !multiColumnParagraph?.body ||
      multiColumnParagraph.body?.length === 0
    ) {
      return null;
    }

    //intermediate step to avoid circular dependency
    const Paragraphs = paragraphsRenderer();

    const defaultStyles: MultiColumnParagraphFactoryOptionsStyles = {
      Container: '',
      Row: '',
    };

    const getStyles = (): MultiColumnParagraphFactoryOptionsStyles => {
      const styles: MultiColumnParagraphFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };
    const styles: MultiColumnParagraphFactoryOptionsStyles = getStyles();

    return (
      <div
        className={classNames(
          styles.Container,
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MULTI_COLUMN_PARAGRAPH,
        )}
      >
        <div className={styles.Row}>
          {multiColumnParagraph.body.map(
            (paragraph: MultiColumnParagraphEntry, index) => {
              return (
                <div
                  key={`multi-column-paragraph-${index}`}
                  data-testid="multi-column-paragraph"
                  className={classNames(getGridColsByProps(props))}
                >
                  <Paragraphs
                    pageBody={[
                      {
                        ...paragraph,
                        isLastOfGroup:
                          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                          index === multiColumnParagraph.body.length - 1,
                      },
                    ]}
                    hasContainer={false}
                    origin={MULTI_COLUMNS_PARAGRAPH}
                  />
                </div>
              );
            },
          )}
        </div>
      </div>
    );
  };

  return MultiColumnParagraph;
};

export default multiColumnParagraphFactory;
