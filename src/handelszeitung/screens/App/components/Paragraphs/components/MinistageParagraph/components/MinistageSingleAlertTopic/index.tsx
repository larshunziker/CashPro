/**
 * @file   Ministage Single Alert Topic
 */

/* istanbul ignore file */

import classNames from 'classnames';
import ministageSingleAlertTopic from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic/factory';
import AlertItem from '../../../../../AlertItem';
import SubscribeButton from '../../../../../SubscribeButton';
import {
  STYLE_16X9_280,
  STYLE_16X9_440,
} from '../../../../../../../../../shared/constants/images';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MinistageSingleAlertTopicProps } from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic/typings';

const getStylesByProps = ({
  isSplittedPageLayout,
}: MinistageSingleAlertTopicProps) => {
  return {
    Wrapper: styles.Wrapper,
    ContentWrapper: classNames({
      [grid.Container]: !isSplittedPageLayout,
    }),
    Title: styles.Title,
    AlertItemWrapper: styles.AlertItemWrapper,
  };
};

export default ministageSingleAlertTopic({
  AlertItem,
  SubscribeButton,
  imageStyles: {
    style_320: STYLE_16X9_280,
    style_1680: STYLE_16X9_440,
  },
  styles: getStylesByProps,
});
