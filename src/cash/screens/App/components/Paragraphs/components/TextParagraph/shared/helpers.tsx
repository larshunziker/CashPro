import React from 'react';
import classNames from 'classnames';
import {
  INFO_BOX_STYLE_INFO,
  INFO_BOX_STYLE_TIP,
  INFO_BOX_STYLE_WARNING,
} from '../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import {
  ADVERTISING_TYPE_SPONSORING,
  LEXICON_TYPE,
} from '../../../../../../../../shared/constants/content';
import {
  INFOBOX_PARAGRAPH,
  SECTION_PARAGRAPH,
  TEXT_PARAGRAPH_TABLE_STRIPED_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_WITHOUT_BORDERS_STYLE_VALUE,
} from '../../../../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_TEXT_PARAGRAPH,
} from '../../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

export const getStylesByProps = ({
  origin = '',
  textParagraph,
}: TextParagraphProps): TextParagraphFactoryOptionsStyles => {
  return {
    Wrapper: classNames(
      TRACKING_CLASS_PARAGRAPH,
      TRACKING_CLASS_TEXT_PARAGRAPH,
      styles.RichTextWrapper,
      {
        [styles.TableCaptionLeft]: origin === ADVERTISING_TYPE_SPONSORING,
        [styles.TableWithoutBorder]:
          textParagraph?.styleValue ===
          TEXT_PARAGRAPH_TABLE_WITHOUT_BORDERS_STYLE_VALUE,
        [styles.TableStriped]:
          textParagraph?.styleValue ===
          TEXT_PARAGRAPH_TABLE_STRIPED_STYLE_VALUE,
      },
    ),
    Overflow: classNames(styles.Overflow, {
      [styles.Infobox]: origin.startsWith(INFOBOX_PARAGRAPH),
      [styles.Info]: origin === `${INFOBOX_PARAGRAPH}_${INFO_BOX_STYLE_INFO}`,
      [styles.Tip]: origin === `${INFOBOX_PARAGRAPH}_${INFO_BOX_STYLE_TIP}`,
      [styles.Warning]:
        origin === `${INFOBOX_PARAGRAPH}_${INFO_BOX_STYLE_WARNING}`,
    }),
    HideLeftShadow: styles.HideLeftShadow,
    HideRightShadow: styles.HideRightShadow,
    Header: styles.Header,
  };
};

export const getHeaderByProps = (
  { origin, textParagraph }: TextParagraphProps,
  appStyles: TextParagraphFactoryOptionsStyles,
) => {
  if (!textParagraph.header) {
    return null;
  }

  if (origin === `${SECTION_PARAGRAPH}_${LEXICON_TYPE}`) {
    return (
      <h3 data-testid="textparagraph-header-h3" className={appStyles.Header}>
        {textParagraph.header}
      </h3>
    );
  }

  return (
    <h2 data-testid="textparagraph-header" className={appStyles.Header}>
      {textParagraph.header}
    </h2>
  );
};
