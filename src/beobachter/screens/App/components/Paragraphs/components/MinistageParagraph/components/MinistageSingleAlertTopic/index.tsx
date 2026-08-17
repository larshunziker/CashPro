/**
 * @file   Ministage Single Alert Topic
 */

/* istanbul ignore file */

import ministageSingleAlertTopic from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic/factory';
import AlertItem from '../../../../../AlertItem';
import SubscribeButton from '../../../../../SubscribeButton';
import {
  STYLE_16X9_280,
  STYLE_16X9_440,
} from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

export default ministageSingleAlertTopic({
  AlertItem,
  SubscribeButton,
  imageStyles: {
    style_320: STYLE_16X9_280,
    style_1680: STYLE_16X9_440,
  },
  styles: {
    Wrapper: '',
    ContentWrapper: '',
    Title: styles.Title,
    AlertItemWrapper: styles.AlertItemWrapper,
  },
});
