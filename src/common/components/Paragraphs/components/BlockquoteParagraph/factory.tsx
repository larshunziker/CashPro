import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_BLOCKQUOTE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  BlockquoteParagraphFactoryOptions,
  BlockquoteParagraphFactoryOptionsStyles,
  BlockquoteParagraphProps,
} from './typings';

const defaultStyles: BlockquoteParagraphFactoryOptionsStyles = {
  Wrapper: '',
  Quote: '',
  QuoteAuthor: '',
};

const BlockquoteParagraphFactory = ({
  styles: appStyles,
}: BlockquoteParagraphFactoryOptions) => {
  class BlockquoteParagraph extends Component<BlockquoteParagraphProps> {
    constructor(props: BlockquoteParagraphProps) {
      super(props);
    }

    getStyles = (): BlockquoteParagraphFactoryOptionsStyles => {
      const styles =
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    render(): ReactElement | null {
      const { blockquoteParagraph } = this.props;
      const styles = this.getStyles();

      if (!blockquoteParagraph?.text) {
        return null;
      }

      return (
        <blockquote
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_BLOCKQUOTE_PARAGRAPH,
            styles.Wrapper,
          )}
        >
          <p className={styles.Quote}>{blockquoteParagraph.text}</p>

          {blockquoteParagraph.source && (
            <cite className={styles.QuoteAuthor}>
              {blockquoteParagraph.source}
            </cite>
          )}
        </blockquote>
      );
    }
  }

  return BlockquoteParagraph;
};

export default BlockquoteParagraphFactory;
