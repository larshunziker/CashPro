import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import textParagraphFactory from '../../../../../../../common/components/Paragraphs/components/TextParagraph/components/Default/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_TEXT_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  HOROSCOPE_DETAIL_DAILY,
  HOROSCOPE_DETAIL_DEFAULT,
} from '../../../../screens/HoroscopeDetail/constants';
import {
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
  PAGE_SCREEN_MARKETING_TYPE,
} from '../../../../screens/PageScreen/constants';
import { INFO_BOX_TYPE } from '../InfoBoxParagraph/constants';
import { ACCORDION_PAGE } from '../MinistageParagraph/components/MinistageAccordion/constants';
import styles from './styles.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

export type TextParagraphPropsInner = TextParagraphProps & {
  activeMainChannel: ActiveMainChannel;
};

export type TextParagraphHeaderPropsInner = Partial<TextParagraphPropsInner> & {
  textParagraph: TextParagraph & {
    title?: string;
    shortTitle?: string;
    headerComponent?: ReactElement;
  };
};

const getStylesByProps = ({
  activeMainChannel,
  origin,
  isFirst,
  textParagraph,
}: TextParagraphPropsInner): TextParagraphFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: classNames(
      getThemedClass('RichtextWrapper'),
      TRACKING_CLASS_PARAGRAPH,
      TRACKING_CLASS_TEXT_PARAGRAPH,
      {
        [styles.Accordion]: origin === ACCORDION_PAGE,
        [styles.MarketingPage]: origin === PAGE_SCREEN_MARKETING_TYPE,
        [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
      },
    ),
    Header: classNames(getThemedClass('Header'), {
      [styles.InfoBoxHeader]: !isFirst && origin === INFO_BOX_TYPE,
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [getThemedClass('InfoBoxHeaderTitle')]:
        isFirst && origin === INFO_BOX_TYPE,
      [styles.InfoBoxHeaderTitleMargin]:
        isFirst && origin === INFO_BOX_TYPE && textParagraph.text,
      [styles.HoroscopeHeaderTitle]:
        origin === HOROSCOPE_DETAIL_DEFAULT && textParagraph.text,
      [styles.MarketingPage]: origin === PAGE_SCREEN_MARKETING_TYPE,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
    }),
  };
};

const getHeaderByProps = (
  { origin, textParagraph }: TextParagraphHeaderPropsInner,
  appStyles: TextParagraphFactoryOptionsStyles,
) => {
  if (!textParagraph.header && !textParagraph.headerComponent) {
    return null;
  }

  if (origin === HOROSCOPE_DETAIL_DAILY) {
    return textParagraph.headerComponent;
  }

  return (
    <div data-testid="textparagraph-header" className={appStyles.Header}>
      {textParagraph.header}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const TextParagraph = connect(mapStateToProps)(
  textParagraphFactory({
    styles: getStylesByProps,
    /* @ts-ignore TODO: TS2322 ->  Type '({ origin, textParagraph } */
    header: getHeaderByProps,
  }),
);

export default TextParagraph;
