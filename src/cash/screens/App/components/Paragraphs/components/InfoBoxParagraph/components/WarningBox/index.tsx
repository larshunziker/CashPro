import React from 'react';
import DefaultBoxFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/DefaultBox/factory';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'infoBoxParagraph' implicitly has an 'any' type. */
const getAppParagraphsRenderer = ({ infoBoxParagraph }) => {
  if (!infoBoxParagraph?.infoBox?.body) {
    return null;
  }
  return (
    <ParagraphsRenderer
      pageBody={infoBoxParagraph.infoBox.body}
      hasContainer={false}
      origin={INFO_BOX_TYPE}
    />
  );
};

const WarningBoxParagraph = DefaultBoxFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ infoBoxParagraph } */
  paragraphsRenderer: getAppParagraphsRenderer,
  styles: {
    Wrapper: styles.Wrapper,
    InnerWrapper: '',
    ParagraphWrapper: '',
  },
});

export default WarningBoxParagraph;
