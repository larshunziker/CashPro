import { connect } from 'react-redux';
import embedParagraphFactory from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import EmbedConsentBlock from './components/EmbedConsentBlock';
import styles from './styles.legacy.css';
import {
  EmbedParagraphFactoryOptionsStyles,
  EmbedParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';
type EmbedParagraphPropsInner = EmbedParagraphProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStylesByProps = ({
  activeMainChannel,
}: EmbedParagraphPropsInner): EmbedParagraphFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: styles.Wrapper,
    TitleWrapper: styles.TitleWrapper,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    Title: getThemedClass('Title'),
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const EmbedParagraph = embedParagraphFactory({
  styles: getStylesByProps,
  EmbedConsentBlock,
});

export default connect(mapStateToProps)(EmbedParagraph);
