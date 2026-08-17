import React from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_PLACEHOLDER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  PlaceholderParagraphProps,
  PlaceholderParagraphFactoryOptions,
  PlaceholderParagraphFactoryOptionsStyles,
} from './typings';

type PlaceholderParagraphPropsInner = PlaceholderParagraphProps;

const defaultStyles: PlaceholderParagraphFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  TitleWrapper: '',
};

const PlaceholderParagraphFactory = ({
  styles: appStyles,
}: PlaceholderParagraphFactoryOptions) => {
  const PlaceholderParagraph = (props: PlaceholderParagraphPropsInner) => {
    const { placeholderParagraph } = props;

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    if (!placeholderParagraph?.contentSourceValue) {
      return null;
    }

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_PLACEHOLDER_PARAGRAPH,
          styles.Wrapper,
        )}
        data-testid="placeholder-paragraph-factory-wrapper"
      >
        {placeholderParagraph.title && (
          <div
            data-testid="placeholder-paragraph-factory-header"
            className={styles.TitleWrapper}
          >
            <h5 className={styles.Title}>{placeholderParagraph.title}</h5>
          </div>
        )}
        {/* TODO: // handle different types of placeholder paragraph here */}
        {`${placeholderParagraph.contentSourceLabel}: ${placeholderParagraph.contentSourceValue}`}
      </div>
    );
  };

  return PlaceholderParagraph;
};

export default PlaceholderParagraphFactory;
