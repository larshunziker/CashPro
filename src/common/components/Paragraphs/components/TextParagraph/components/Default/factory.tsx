import React from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_TEXT_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  TextParagraphComponent,
  TextParagraphFactoryOptions,
  TextParagraphFactoryOptionsStyles,
} from '../../typings';

export default ({
  styles: appStyles,
  header: appHeader,
}: TextParagraphFactoryOptions): TextParagraphComponent => {
  const TextParagraphDefault: TextParagraphComponent = (props) => {
    const { textParagraph } = props;

    if (!textParagraph || (!textParagraph.header && !textParagraph.text)) {
      return null;
    }

    const defaultStyles: TextParagraphFactoryOptionsStyles = {
      Wrapper: '',
      Header: '',
    };

    const getStyles = (): TextParagraphFactoryOptionsStyles => {
      const styles: TextParagraphFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };
    const styles: TextParagraphFactoryOptionsStyles = getStyles();

    const defaultHeader = textParagraph.header && (
      <div data-testid="textparagraph-header" className={styles.Header}>
        {textParagraph.header}
      </div>
    );

    const getHeaderByProps = () => {
      const header =
        (typeof appHeader === 'function' && appHeader(props, styles)) ||
        (typeof appHeader === 'string' && appHeader) ||
        defaultHeader;

      return header;
    };

    const header = getHeaderByProps();

    return (
      <div
        data-testid="textparagraph-outer-div"
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_TEXT_PARAGRAPH,
          styles.Wrapper,
        )}
      >
        {header || null}
        {(textParagraph.text && (
          <div
            data-testid="textparagraph-text"
            dangerouslySetInnerHTML={{ __html: textParagraph.text }}
          />
        )) ||
          null}
      </div>
    );
  };

  return TextParagraphDefault;
};
