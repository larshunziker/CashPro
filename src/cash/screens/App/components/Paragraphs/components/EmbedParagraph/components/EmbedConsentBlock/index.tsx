import React from 'react';
import embedConsentBlockFactory from '../../../../../../../../../common/components/Paragraphs/components/EmbedParagraph/components/EmbedConsentBlock/factory';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { EMBED_CONSENT_BLOCK_CONTENT } from './constants';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({ clickHandler }) => {
  return (
    <ButtonWithLoading
      size="big"
      variant="primary"
      fullWidth
      onClick={clickHandler}
      type="submit"
    >
      {EMBED_CONSENT_BLOCK_CONTENT.buttonLabel}
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

export default EmbedConsentBlock;
