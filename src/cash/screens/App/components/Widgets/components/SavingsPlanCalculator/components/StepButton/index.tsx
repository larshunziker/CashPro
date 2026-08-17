import React from 'react';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';
import { StepButtonProps } from './typings';

const StepButton = (props: StepButtonProps) => {
  const { iconType, onClick } = props;
  const eventActions = { IconPlusThin: 'plus', IconMinusThin: 'minus' };

  return (
    <>
      <button
        onClick={() => {
          onClick();
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: `stepbutton_click`,
              event_category: 'stepbutton',
              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ IconPlusThin */
              event_action: `click_${eventActions[iconType] || 'other_icon'}`,
            },
          });
        }}
        className={styles.Button}
      >
        <Icon type={iconType} />
      </button>
    </>
  );
};

export default StepButton;
