import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import embedConsentBlockFactory from '../../../../../../../../../common/components/Paragraphs/components/EmbedParagraph/components/EmbedConsentBlock/factory';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { EMBED_CONSENT_BLOCK_CONTENT } from './constants';
import styles from './styles.legacy.css';
import { ButtonWithLoadingProps } from '../../../../../../../../../common/components/ButtonWithLoading/typings';

type ExtendedButtonWithLoadingProps = ButtonWithLoadingProps & {
  language?: string;
};

type ExtendedButtonWithLoading = (
  props: ExtendedButtonWithLoadingProps,
) => ReactElement;

const Button: ExtendedButtonWithLoading = ({ clickHandler, language }) => {
  return (
    <ButtonWithLoading
      size="big"
      variant="primary"
      fullWidth
      onClick={clickHandler}
      type="submit"
    >
      {/* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */}
      {EMBED_CONSENT_BLOCK_CONTENT[language]?.buttonLabel ||
        EMBED_CONSENT_BLOCK_CONTENT.buttonLabel}
    </ButtonWithLoading>
  );
};
const EmbedConsentBlock = embedConsentBlockFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Link: styles.Link,
    Title: styles.Title,
    Lead: styles.Lead,
    Container: styles.Container,
    LinkWrapper: styles.LinkWrapper,
  },
  Button,
  consentBlockContent: EMBED_CONSENT_BLOCK_CONTENT,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

export default compose<any, any>(connect(mapStateToProps))(EmbedConsentBlock);
