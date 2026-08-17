import classNames from 'classnames';
import textParagraphFactory from '../../../../../../../common/components/Paragraphs/components/TextParagraph/components/Default/factory';
import styles from './styles.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

type TextParagraphPropsInner = TextParagraphProps;

const getStylesByProps = ({
  addClass = '',
  isFirst,
}: TextParagraphPropsInner): TextParagraphFactoryOptionsStyles => ({
  Wrapper: classNames({
    [addClass]: !!addClass,
    [styles.RichTextWrapper]: !isFirst,
    [styles.RichTextWrapperFirst]: isFirst,
  }),
  Header: styles.Header,
});

const TextParagraph = textParagraphFactory({
  styles: getStylesByProps,
});

export default TextParagraph;
