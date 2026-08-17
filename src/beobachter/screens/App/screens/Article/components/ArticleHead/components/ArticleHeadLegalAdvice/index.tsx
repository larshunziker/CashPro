import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import ArticleLeadLegalAdvice from '../../../ArticleLead/components/ArticleLeadLegalAdvice';
import UtilityBar from '../../../../../../components/UtilityBar';
import UtilityOverlay from '../../../../../../components/UtilityBar/components/UtilityOverlay';
import {
  UTILITYBAR_CONFIG_RR,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleHeadLegalAdviceProps } from './typings';

type ArticleHeadLegalAdvicePropsInner = ArticleHeadLegalAdviceProps;

const ArticleHeadLegalAdvice = ({
  article,
}: ArticleHeadLegalAdvicePropsInner) => (
  <TestFragment data-testid="article-head-legal-advice-wrapper">
    <ArticleLeadLegalAdvice article={article} />

    {!__TESTING__ && (
      <div
        className={classNames(
          'article-head-legal-advice-utility-bar-wrapper',
          styles.Wrapper,
        )}
      >
        <div className={grid.Row}>
          <div className={classNames('utility-bar-wrapper', grid.ColXs24)}>
            <BodyClassName className={styles.ArticleBody}>
              <UtilityBar
                enabledUtilities={UTILITYBAR_CONFIG_RR}
                shouldUseSwipeable
              >
                {({ isOverlayVisible, toggleOverlayVisible }) => (
                  <div className={styles.UtilityOverlayWrapper}>
                    <UtilityOverlay
                      overlayTitle="Artikel teilen"
                      isOverlayVisible={isOverlayVisible}
                      toggleOverlayVisible={toggleOverlayVisible}
                      enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_ARTICLE}
                    />
                  </div>
                )}
              </UtilityBar>
            </BodyClassName>
          </div>
        </div>
      </div>
    )}
  </TestFragment>
);

export default ArticleHeadLegalAdvice;
