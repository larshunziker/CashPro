import React, { memo } from 'react';
import classNames from 'classnames';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import AIAIChatbotLoader from './AIAIChatbotLoader';
import { PAGE_SCREEN_HERO_MEDIA_TYPE } from '../../../../../../screens/PageScreen/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const MinistageChatbot = ({
  ministageParagraph,
  origin,
}: {
  ministageParagraph: any;
  origin?: string;
}) => {
  const { headline, lead, sampleQuestions, subhead } = ministageParagraph;
  const isInColumn =
    isInsideColumn(origin || '') || origin === PAGE_SCREEN_HERO_MEDIA_TYPE;

  return (
    <div
      data-testid="ministage-search"
      className={classNames('ministage-search-wrapper', styles.Wrapper, {
        [grid.ContainerInner]: isInColumn,
        [classNames(grid.Container, styles.WrapperLarge)]: !isInColumn,
      })}
    >
      <div className={styles.ContentWrapper}>
        {headline && <div className={styles.Title}>{headline}</div>}
        <AIAIChatbotLoader
          placeholder={lead}
          buttonText={subhead}
          sampleQuestions={sampleQuestions}
        />
      </div>
    </div>
  );
};

export default memo(MinistageChatbot);
