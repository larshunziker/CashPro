/* istanbul ignore file */

import React from 'react';
import Button from '../../../../../../components/ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonRendererProps } from './typings';

const ButtonRenderer = ({ button, highAttention }: ButtonRendererProps) => {
  const { buttonType, buttonVariants } = button;
  return (
    <div className={styles.ButtonTypePreviewSection}>
      <div className={styles.TitleWrapper}>
        <h3 className={styles.Title3}>{buttonType} - Big Buttons</h3>
        <a
          className={styles.Link}
          href="https://www.figma.com/file/DITzrg9djXYv5nCSlOcRBf/cash_library?node-id=12%3A1"
          target="_blank"
        >
          <span className={styles.FigmaFlag}>
            <span>figmaname:</span>
            {`Button${
              buttonType.charAt(0).toUpperCase() + buttonType.slice(1)
            }Big`}
          </span>
        </a>
      </div>
      <div className={styles.ButtonWrapper}>
        {buttonVariants?.map((button, index) => {
          return (
            <Button
              key={`button-big-${index}`}
              variant={buttonType}
              iconTypeLeft={button.iconTypeLeft}
              //eslint-disable-next-line
              onClick={() => console.log('button clicked')}
              loading={button.loadingState || false}
              highAttention={highAttention}
            >
              {buttonType}
            </Button>
          );
        })}
      </div>
      <div className={styles.TitleWrapper}>
        <h3 className={styles.Title3}>{buttonType} - Small Buttons</h3>
        <a
          className={styles.Link}
          href="https://www.figma.com/file/DITzrg9djXYv5nCSlOcRBf/cash_library?node-id=12%3A1"
          target="_blank"
        >
          <span className={styles.FigmaFlag}>
            <span>figmaname:</span>
            {`Button${
              buttonType.charAt(0).toUpperCase() + buttonType.slice(1)
            }Small`}
          </span>
        </a>
      </div>
      <div className={styles.ButtonWrapper}>
        {buttonVariants?.map((button, index) => {
          return (
            <Button
              size="small"
              key={`button-small-${index}`}
              variant={buttonType}
              iconTypeLeft={button.iconTypeLeft}
              //eslint-disable-next-line
              onClick={() => console.log('button clicked')}
              loading={button.loadingState || false}
              highAttention={highAttention}
            >
              {buttonType}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonRenderer;
