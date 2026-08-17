import React from 'react';
import classNames from 'classnames';
import textParagraphFactory from '../../../../../../../common/components/Paragraphs/components/TextParagraph/components/Default/factory';
import { FINANCE_DICTIONARY_TYPE } from '../../../../../../../shared/constants/content';
import {
  PAGESCREEN_MARKETING_TYPE,
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
} from '../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

type TextParagraphPropsInner = TextParagraphProps;

export const getStylesByProps = ({
  addClass = '',
  isFirst,
  origin = '',
}: TextParagraphPropsInner): TextParagraphFactoryOptionsStyles => {
  return {
    Wrapper: classNames({
      [addClass]: !!addClass,
      [styles.RichTextWrapper]: !isFirst,
      [styles.RichTextWrapperFirst]: isFirst,
      [styles.MarketingPage]: origin === PAGESCREEN_MARKETING_TYPE,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
    }),
    Header: classNames(styles.Header, {
      [styles.MarketingPage]: origin === PAGESCREEN_MARKETING_TYPE,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
    }),
  };
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'textParagraph' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'appStyles' implicitly has an 'any' type. */
export const getHeaderByProps = ({ origin, textParagraph }, appStyles) => {
  if (!textParagraph.header) {
    return null;
  }

  if (origin === FINANCE_DICTIONARY_TYPE) {
    return (
      <h3
        data-testid="textparagraph-header-finance-dictionary"
        className={appStyles.Header}
      >
        {textParagraph.header}
      </h3>
    );
  }

  return (
    <div data-testid="textparagraph-header" className={appStyles.Header}>
      {textParagraph.header}
    </div>
  );
};

const TextParagraph = textParagraphFactory({
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ origin, textParagraph } */
  header: getHeaderByProps,
});

export default TextParagraph;
