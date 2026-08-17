import React, { FC } from 'react';
import classNames from 'classnames';
import LinkBoxParagraph from '../../../LinkBoxParagraph';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { InfoBoxParagraphPropsInner, styles } from './index';
import {
  INFO_BOX_STYLE_GUIDER,
  INFO_BOX_TYPE,
} from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { LINK_BOX_PARAGRAPH } from '../../../../../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_RATGEBER,
} from '../../../../../../../../../shared/constants/content';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../../../common/screens/PageTemplate/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';

type Paragraph = ParagraphInterface & {
  __typename?: string;
};

const ContainerWrapper = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  children,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'renderContainer' implicitly has an 'any' type. */
  renderContainer,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'renderRow' implicitly has an 'any' type. */
  renderRow,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'colStyle' implicitly has an 'any' type. */
  colStyle,
}) => {
  if (renderContainer) {
    return (
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={colStyle}>{children}</div>
        </div>
      </div>
    );
  }

  if (renderRow) {
    return (
      <div className={grid.Row}>
        <div className={colStyle}>{children}</div>
      </div>
    );
  }

  return colStyle ? <div className={colStyle}>{children}</div> : children;
};

const renderGuiderTemplate = (
  body: Paragraph[],
  origin: string,
  pageLayoutType: string,
) => {
  const linkBoxParagraphs: Paragraph[] = body.filter(
    (paragraph) => paragraph.__typename === LINK_BOX_PARAGRAPH,
  );
  const filteredBodyParagraphs: Paragraph[] = body.filter(
    (paragraph) => paragraph.__typename !== LINK_BOX_PARAGRAPH,
  );

  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    pageLayoutType,
  );

  const isInGuideArticle = origin === ARTICLE_TYPE_GUIDE;
  const isInLongReadArticle = origin === ARTICLE_TYPE_LONG_READ;

  return (
    <ContainerWrapper
      renderContainer={
        !isSplittedPageLayout &&
        ![ARTICLE_TYPE_LONG_READ, ARTICLE_TYPE_GUIDE].includes(origin)
      }
      renderRow={
        ![
          ARTICLE_TYPE_LONG_READ,
          ARTICLE_TYPE_RATGEBER,
          ARTICLE_TYPE_GUIDE,
        ].includes(origin)
      }
      colStyle={classNames({
        [classNames(
          grid.ColOffsetSm1,
          grid.ColSm22,
          grid.ColOffsetMd1,
          grid.ColMd17,
          grid.ColOffsetXl5,
          grid.ColXl14,
        )]: !isSplittedPageLayout && !isInGuideArticle && !isInLongReadArticle,
        [classNames(
          grid.ColOffsetSm2,
          grid.ColSm20,
          grid.ColOffsetMd4,
          grid.ColMd16,
        )]: isInLongReadArticle,
      })}
    >
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_INFO_BOX_PARAGRAPH,
          'infobox',
          'guider-box',
          styles.GuiderWrapper,
        )}
      >
        <div
          className={classNames(styles.Header, {
            [styles.HasLinkBox]: linkBoxParagraphs.length > 0,
          })}
        >
          <div className={styles.Badge}>Rechtsratgeber</div>

          {filteredBodyParagraphs.length > 0 && (
            <ParagraphsRenderer
              pageBody={filteredBodyParagraphs}
              hasContainer={false}
              addClass={styles.Typography}
              origin={INFO_BOX_TYPE}
              style={INFO_BOX_STYLE_GUIDER}
            />
          )}
        </div>

        {linkBoxParagraphs.map(
          (paragraph: ParagraphInterface, index: number) => (
            <div key={`linkbox-paragraph-${index}`} className={styles.LinkBox}>
              <LinkBoxParagraph linkBox={paragraph} component="guider" />
            </div>
          ),
        )}
      </div>
    </ContainerWrapper>
  );
};

const RechtsratgeberBox: FC<InfoBoxParagraphPropsInner> = ({
  origin,
  infoBoxParagraph,
  pageLayoutType,
}) => {
  if (
    !infoBoxParagraph.infoBox ||
    !infoBoxParagraph.infoBox.body ||
    infoBoxParagraph.infoBox.body.length < 1
  ) {
    return null;
  }

  return renderGuiderTemplate(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<ParagraphInterface>[]' is not assignable to parameter of type 'Paragraph[]'. */
    infoBoxParagraph.infoBox.body,
    origin,
    pageLayoutType,
  );
};

export default RechtsratgeberBox;
