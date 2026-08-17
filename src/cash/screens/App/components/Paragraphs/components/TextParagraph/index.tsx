import React, { ComponentType, memo } from 'react';
import classNames from 'classnames';
import createComponentSwitch from '../../../../../../shared/decorators/componentSwitch';
import TextParagraphDefault from './components/Default';
import TextParagraphTable from './components/Table';
import {
  PAGESCREEN_MARKETING_TYPE,
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
} from '../../../../screens/PageScreen/constants';
import { TEXT_PARAGRAPH_DEFAULT, TEXT_PARAGRAPH_TABLE } from './constants';
import styles from './styles.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

type TextParagraphPropsInner = TextParagraphProps & {
  component: typeof TEXT_PARAGRAPH_DEFAULT | typeof TEXT_PARAGRAPH_TABLE;
};

export const getStylesByProps = ({
  addClass = '',
  origin = '',
}: TextParagraphPropsInner): TextParagraphFactoryOptionsStyles => {
  const isMarketingPage = origin === PAGESCREEN_MARKETING_TYPE;
  return {
    Wrapper: classNames(styles.RichTextWrapper, {
      [addClass]: !!addClass,
      [styles.MarketingPage]: isMarketingPage,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
    }),
    Header: classNames(styles.Header, {
      [styles.MarketingPage]: isMarketingPage,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
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

const TextParagraph: ComponentType<TextParagraphPropsInner> =
  createComponentSwitch(
    {
      [TEXT_PARAGRAPH_DEFAULT]: TextParagraphDefault,
      [TEXT_PARAGRAPH_TABLE]: TextParagraphTable,
    },
    'component',
  );

export default memo(TextParagraph);
