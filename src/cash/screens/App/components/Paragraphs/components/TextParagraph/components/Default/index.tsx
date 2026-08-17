import React from 'react';
import classNames from 'classnames';
import textParagraphDefaultFactory from '../../../../../../../../../common/components/Paragraphs/components/TextParagraph/components/Default/factory';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../../../screens/PageScreen/constants';
import styles from '../../shared/styles.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

type TextParagraphPropsInner = TextParagraphProps;

export const getStylesByProps = ({
  addClass = '',
  origin = '',
}: TextParagraphPropsInner): TextParagraphFactoryOptionsStyles => {
  const isMarketingPage = origin === PAGESCREEN_MARKETING_TYPE;
  return {
    Wrapper: classNames(styles.RichTextWrapper, {
      [addClass]: !!addClass,
      [styles.MarketingPage]: isMarketingPage,
    }),
    Header: classNames(styles.Header, {
      [styles.MarketingPage]: isMarketingPage,
    }),
  };
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'textParagraph' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'addHeaderClass' implicitly has an 'any' type. */
export const getHeaderByProps = ({ origin, textParagraph, addHeaderClass }) => {
  if (!textParagraph.header) {
    return null;
  }

  return (
    <h2
      data-testid="textparagraph-header"
      className={classNames(addHeaderClass || styles.Header, {
        [styles.MarketingPage]: origin === PAGESCREEN_MARKETING_TYPE,
      })}
    >
      {textParagraph.header}
    </h2>
  );
};

const TextParagraphDefault = textParagraphDefaultFactory({
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ origin, textParagraph, addHeaderClass } */
  header: getHeaderByProps,
});

export default TextParagraphDefault;
