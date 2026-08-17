/* istanbul ignore file */
import classNames from 'classnames';
import embedParagraphFactory from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/factory';
import EmbedConsentBlock from './components/EmbedConsentBlock';
import { TYPE_RIGHT_WIDGET } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { ARTICLE_TYPE_LONG_READ } from '../../../../../../../shared/constants/content';
import {
  EMBED_WIDTH_FULL,
  EMBED_WIDTH_GRID,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/constants';
import styles from './styles.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'embedParagraph' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
function getStylesByProps({ embedParagraph, origin }) {
  const isInLongFormArticleBody = origin === ARTICLE_TYPE_LONG_READ;
  const isDefaultWidth = ![EMBED_WIDTH_FULL, EMBED_WIDTH_GRID].includes(
    embedParagraph.embedWidth,
  );

  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.RightWidgetWrapper]: origin === TYPE_RIGHT_WIDGET,
      [classNames(
        grid.ColOffsetSm2,
        grid.ColSm20,
        grid.ColOffsetMd4,
        grid.ColMd16,
      )]: isInLongFormArticleBody && isDefaultWidth,
    }),
    TitleWrapper: '',
    Title: styles.Title,
  };
}
const EmbedParagraph = embedParagraphFactory({
  styles: getStylesByProps,
  EmbedConsentBlock,
});

export default EmbedParagraph;
