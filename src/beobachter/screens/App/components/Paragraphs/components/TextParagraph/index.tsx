import { ComponentType } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch';
import TextParagraphDefault from './components/Default';
import TextParagraphTable from './components/Table';

import { TEXT_PARAGRAPH_DEFAULT, TEXT_PARAGRAPH_TABLE } from './constants';
import { TextParagraphProps } from '../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

export type TextParagraphPropsInner = TextParagraphProps & {
  component?: typeof TEXT_PARAGRAPH_DEFAULT | typeof TEXT_PARAGRAPH_TABLE;
};

const TextParagraph: ComponentType<TextParagraphPropsInner> =
  createComponentSwitch({
    [TEXT_PARAGRAPH_DEFAULT]: TextParagraphDefault,
    [TEXT_PARAGRAPH_TABLE]: TextParagraphTable,
  });

export default TextParagraph;
