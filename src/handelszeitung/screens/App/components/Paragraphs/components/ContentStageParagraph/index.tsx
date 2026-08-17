import React from 'react';
import classNames from 'classnames';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import TeaserGrid from '../../../TeaserGrid';
import {
  TRACKING_CLASS_CONTENT_STAGE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  GRID_LAYOUT_CONTENT_STAGE,
  GRID_LAYOUT_CONTENT_STAGE_FIRST,
} from '../../../TeaserGrid/gridConfigs/constants';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'stage' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isFirst' implicitly has an 'any' type. */
const ContentStageParagraph = ({ stage, isFirst }) => {
  // no entity queue items OR no contentReference (and its title) = no rendering
  if (
    !stage ||
    !stage.entityQueue ||
    !stage.entityQueue.items ||
    stage.entityQueue.items.edges.length === 0 ||
    !stage.contentReference ||
    !stage.contentReference.title
  ) {
    return null;
  }
  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_CONTENT_STAGE_PARAGRAPH,
      )}
    >
      <div className={styles.ContentStageHeader}>
        <div className={sections.Container}>
          <Link path={stage.contentReference.preferredUri}>
            <div className={styles.ContentStageTitle}>
              {stage.contentReference.title || ''}
            </div>
          </Link>

          {/* eslint-disable react/no-danger */}
          {stage.contentReference.lead && (
            <p
              className={styles.ContentStageLead}
              dangerouslySetInnerHTML={{ __html: stage.contentReference.lead }}
            />
          )}
          {/* eslint-enable react/no-danger */}
        </div>
      </div>
      <TeaserGrid
        layout={
          (isFirst && GRID_LAYOUT_CONTENT_STAGE_FIRST) ||
          GRID_LAYOUT_CONTENT_STAGE
        }
        items={ensureTeaserInterface(stage.entityQueue.items.edges || null)}
      />
      {stage.contentReference.title && stage.contentReference.preferredUri && (
        <div className={styles.LinkOutWrapper}>
          <Link path={stage.contentReference.preferredUri}>
            <div className={sections.Container}>
              <span className={styles.LinkOutLink}>
                Weitere Artikel aus dem Dossier{' '}
                <strong>{stage.contentReference.title}</strong>
                <span className={styles.ArrowWrap}>
                  <Icon type="IconArrowRight" />
                </span>
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContentStageParagraph;
