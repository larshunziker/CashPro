/* istanbul ignore file */

import ministageVideoFactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageVideo/factory';
import VideoStage from '../../../../../VideoStage';
import styles from './styles.legacy.css';

export default ministageVideoFactory({
  VideoStage,
  styles: {
    Wrapper: styles.Wrapper,
  },
});
