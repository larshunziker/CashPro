import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { InfoBoxParagraphProps } from '../../../InfoBoxParagraph/typings';
import {
  DefaultBoxFactoryOptions,
  DefaultBoxFactoryOptionsStyles,
} from './typings';

const defaultStyles: DefaultBoxFactoryOptionsStyles = {
  Wrapper: '',
  InnerWrapper: '',
  ParagraphWrapper: '',
};

const DefaultBoxFactory = ({
  title: appTitleElement,
  paragraphsRenderer: appParagraphsRenderer,
  styles: appStyles,
}: DefaultBoxFactoryOptions) => {
  const DefaultBox = (props: InfoBoxParagraphProps): ReactElement => {
    const { infoBoxParagraph, articleColStyle } = props;
    if (
      !Array.isArray(infoBoxParagraph?.infoBox?.body) ||
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      infoBoxParagraph.infoBox.body.length < 1
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const title =
      (typeof appTitleElement === 'function' && appTitleElement(props)) ||
      (typeof appTitleElement === 'object' && appTitleElement) ||
      null;

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
          'default-box',
        )}
      >
        <div className={styles.InnerWrapper}>
          <div className={articleColStyle}>
            {title || null}
            <div className={styles.ParagraphWrapper}>
              {paragraphsRenderer || null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return DefaultBox;
};

export default DefaultBoxFactory;
