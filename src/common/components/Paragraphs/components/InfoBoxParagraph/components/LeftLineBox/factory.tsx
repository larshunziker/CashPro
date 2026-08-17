import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  LeftLineBoxFactoryOptions,
  LeftLineBoxFactoryOptionsStyles,
  LeftLineBoxProps,
} from './typings';

const defaultStyles: LeftLineBoxFactoryOptionsStyles = {
  Wrapper: '',
  InnerWrapper: '',
  Border: '',
  Devider: '',
  ParagraphWrapper: '',
};

const LeftLineBoxFactory = ({
  paragraphsRenderer: appParagraphsRenderer,
  styles: appStyles,
}: LeftLineBoxFactoryOptions) => {
  const LeftLineBox = (props: LeftLineBoxProps): ReactElement => {
    const { infoBoxParagraph, articleColStyle, children } = props;
    if (
      !infoBoxParagraph?.infoBox?.body ||
      infoBoxParagraph.infoBox.body.length < 1
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const paragraphsRenderer =
      (typeof appParagraphsRenderer === 'function' &&
        appParagraphsRenderer(props)) ||
      null;

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_INFO_BOX_PARAGRAPH,
          styles.Wrapper,
          'infobox',
          'left-line',
        )}
      >
        <div className={styles.InnerWrapper}>
          <div className={articleColStyle}>
            <div className={styles.Border}>
              <div className={styles.Devider} />
              <div className={styles.ParagraphWrapper}>
                {children || null}
                {paragraphsRenderer || null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return LeftLineBox;
};

export default LeftLineBoxFactory;
