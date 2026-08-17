import React from 'react';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import Icon from '../Icon';
import Teaser from '../Teaser';
import { TEASER_LAYOUT_TIMELINE } from '../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';
import { TimelineProps } from './typings';

const Timeline = ({ relatedArticles, link = '#' }: TimelineProps) => {
  if (
    !relatedArticles ||
    !relatedArticles.edges ||
    relatedArticles.edges.length === 0
  ) {
    return null;
  }

  const ensuredTeasers = ensureTeaserInterface(relatedArticles.edges);
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Title}>Letzte Nachrichten</div>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
      {ensuredTeasers.map((item, index) => {
        return (
          <div
            className={styles.TimelineTeaserWrapper}
            key={`timeline-teaser-list-${item.node.id}`}
          >
            <Teaser
              component={TEASER_LAYOUT_TIMELINE}
              {...item}
              itemIndex={index}
            />
          </div>
        );
      })}
      <div className={styles.ButtonWrapper}>
        <a href={link} className={styles.Button}>
          Alle Nachrichten <Icon type="IconArrowRight" addClass={styles.Icon} />
        </a>
      </div>
    </div>
  );
};

export default Timeline;
