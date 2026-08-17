/* istanbul ignore file */

import classNames from 'classnames';
import ministageVideoFactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageVideo/factory';
import VideoStage from '../../../../../VideoStage';
import styles from './styles.legacy.css';
import { MinistageVideoProps } from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageVideo/typings';

const getStylesByProps = ({ isSplittedPageLayout }: MinistageVideoProps) => {
  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
      InnerWrapper: '',
    }),
  };
};

export default ministageVideoFactory({
  VideoStage,
  styles: getStylesByProps,
});
