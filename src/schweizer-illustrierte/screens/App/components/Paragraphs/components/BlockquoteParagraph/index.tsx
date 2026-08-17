import { connect } from 'react-redux';
import blockquoteParagraphFactory from '../../../../../../../common/components/Paragraphs/components/BlockquoteParagraph/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import styles from './styles.legacy.css';
import type {
  BlockquoteParagraphFactoryOptionsStyles,
  BlockquoteParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/BlockquoteParagraph/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type BlockquoteParagraphPropsInner = BlockquoteParagraphProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStylesByProps = ({
  activeMainChannel,
}: BlockquoteParagraphPropsInner): BlockquoteParagraphFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: styles.Wrapper,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    Quote: getThemedClass('Quote'),
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    QuoteAuthor: getThemedClass('QuoteAuthor'),
  };
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const BlockquotParagraph = blockquoteParagraphFactory({
  styles: getStylesByProps,
});

export default connect(mapStateToProps)(BlockquotParagraph);
