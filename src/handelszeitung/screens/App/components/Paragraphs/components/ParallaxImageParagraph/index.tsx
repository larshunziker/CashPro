import classNames from 'classnames';
import parallaxImageParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ParallaxImageParagraph/factory';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ParallaxImageParagraphProps } from '../../../../../../../common/components/Paragraphs/components/ParallaxImageParagraph/typings';

const getStylesByProps = ({
  isSplittedPageLayout,
}: ParallaxImageParagraphProps) => {
  return {
    CreditsTitle: classNames(styles.CreditsTitle, {
      [grid.Container]: !isSplittedPageLayout,
    }),
    ImageDefault: styles.ImageDefault,
    Parallax: styles.Parallax,
  };
};

export default parallaxImageParagraphFactory({
  styles: getStylesByProps,
});
