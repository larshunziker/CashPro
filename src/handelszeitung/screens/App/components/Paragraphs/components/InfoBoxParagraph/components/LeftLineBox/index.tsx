import React from 'react';
import leftLineBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/LeftLineBox/factory';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
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
      addClass={styles.Typography}
      addSectionClass={styles.SectionMargin}
      origin={INFO_BOX_TYPE}
    />
  );
};

export default leftLineBoxParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ infoBoxParagraph } */
  paragraphsRenderer: getAppParagraphsRenderer,
  styles: {
    Wrapper: grid.Container,
    InnerWrapper: grid.Row,
    Border: styles.Border,
    Devider: styles.Devider,
    ParagraphWrapper: styles.ParagraphWrapper,
  },
});
