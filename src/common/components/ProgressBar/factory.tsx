import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import grid from '../../assets/styles/grid.legacy.css';
import {
  ProgressBarFactoryOptions,
  ProgressBarFactoryStyles,
  ProgressBarProps,
} from './typings';

export type ProgressBarPropsInner = ProgressBarProps;

const defaultStyles: ProgressBarFactoryStyles = {
  Container: '',
  ProgressBar: '',
};

export const ANCHOR_READING_PROGRESS_BAR = 'reading-progress-bar';

export const ProgressBarPlaceholder = () => (
  <div id={ANCHOR_READING_PROGRESS_BAR} />
);

const ProgressBarFactory = ({
  styles = defaultStyles,
}: ProgressBarFactoryOptions) => {
  const ProgressBar = ({
    trackingElementId,
  }: ProgressBarPropsInner): ReactElement | null => {
    const [placeholderElement, setPlaceholderElement] = useState<Element>();

    useEffect(() => {
      if (!placeholderElement) {
        setPlaceholderElement(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'SetStateAction<Element | undefined>'. */
          document.getElementById(ANCHOR_READING_PROGRESS_BAR),
        );
      }
    }, [placeholderElement]);

    if (!placeholderElement) {
      return null;
    }

    // @ts-ignore This API not exist yet in Typescript
    const viewTimelineExists = typeof ViewTimeline !== 'undefined';
    const trackingElement: HTMLElement | null =
      document.getElementById(trackingElementId);

    if (!viewTimelineExists || !trackingElement) {
      return null;
    }

    const progressBarRef = (element: HTMLDivElement) => {
      if (element) {
        // @ts-ignore This API not exist yet in Typescript
        const viewTrackingTimeline = new ViewTimeline({
          subject: trackingElement,
        });

        // @ts-ignore
        element.animate(
          {
            transform: ['scaleX(0)', 'scaleX(1)'],
          },
          {
            // @ts-ignore This API not exist yet in Typescript
            timeline: viewTrackingTimeline,
            fill: 'both',
            // @ts-ignore This API not exist yet in Typescript
            rangeStart: 'entry 100%',
            rangeEnd: 'entry-crossing 100%',
          },
        );
      }
    };

    return createPortal(
      <div className={classNames(styles.Container, grid.HideForPrint)}>
        <div className={styles.ProgressBar} ref={progressBarRef} />
      </div>,
      placeholderElement,
    );
  };

  return ProgressBar;
};

export default ProgressBarFactory;
