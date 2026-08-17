import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../assets/styles/grid.legacy.css';
import { InfoBoxParagraphProps } from '../../../InfoBoxParagraph/typings';
import {
  TwoColumnsFactoryOptions,
  TwoColumnsFactoryOptionsStyles,
} from './typings';

const defaultStyles: TwoColumnsFactoryOptionsStyles = {
  Wrapper: '',
  LeftWrapper: '',
  RightWrapper: '',
};

const TwoColumnsFactory = ({
  title: appTitleElement,
  paragraphsRenderer: appParagraphsRenderer,
  styles: appStyles,
}: TwoColumnsFactoryOptions) => {
  const TwoColumns = (props: InfoBoxParagraphProps): ReactElement => {
    const { infoBoxParagraph } = props;
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
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const paragraphsJsx = infoBoxParagraph.infoBox.body.map((_, index) => {
      // don't render odd elements because we are wrapping them manualy by index + 1 on line 59
      if (index % 2 !== 0) {
        return null;
      }

      const leftJsx =
        (typeof appParagraphsRenderer === 'function' &&
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          infoBoxParagraph.infoBox.body[index] &&
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          appParagraphsRenderer([infoBoxParagraph.infoBox.body[index]])) ||
        null;
      const rightJsx =
        (typeof appParagraphsRenderer === 'function' &&
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          infoBoxParagraph.infoBox.body[index + 1] &&
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          appParagraphsRenderer([infoBoxParagraph.infoBox.body[index + 1]])) ||
        null;
      return (
        <div key={`two-cols-${index}}`} className={grid.Row}>
          <div className={styles.LeftWrapper}>{leftJsx || null}</div>

          <div className={styles.RightWrapper}>{rightJsx || null}</div>
        </div>
      );
    });

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_INFO_BOX_PARAGRAPH,
          styles.Wrapper,
          'infobox',
          'two-columns',
        )}
      >
        {title || null}
        {paragraphsJsx || null}
      </div>
    );
  };

  return TwoColumns;
};

export default TwoColumnsFactory;
