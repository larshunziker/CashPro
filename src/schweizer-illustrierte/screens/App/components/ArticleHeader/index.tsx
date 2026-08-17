import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserTextFactory from '../../../../../common/components/Teaser/components/TeaserText/factory';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../common/components/LinkLegacy';
import { ARTICLE_HEADER_THEME_VIDEO_DETAIL } from './constants';
import styles from './styles.legacy.css';
import {
  TeaserTextComponent,
  TeaserTextFactoryOptionsStyles,
  TeaserTextFactoryOptionsStylesByProps,
} from '../../../../../common/components/Teaser/components/TeaserText/typings';
import { ActiveMainChannel } from '../../../../shared/types';
import { TeaserTextProps } from './typings';

type TeaserTextPropsInner = TeaserTextProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStylesByProps: TeaserTextFactoryOptionsStylesByProps<
  TeaserTextPropsInner
> = (props: TeaserTextPropsInner): TeaserTextFactoryOptionsStyles => {
  // TODO: type cssClassByChannel properly when it's moved to ts and typed correctly
  const getThemedClass: Function = cssClassByChannel(
    styles,
    props.activeMainChannel || '',
  );

  if (props.theme === ARTICLE_HEADER_THEME_VIDEO_DETAIL) {
    return {
      Wrapper: classNames(getThemedClass('Wrapper'), styles.WrapperSmall),
      ShortTitle: classNames(
        getThemedClass('ShortTitle'),
        styles.ShortTitleFontSmall,
      ),
      Title: classNames(getThemedClass('Title'), styles.TitleFontSmall),
      Lead: classNames(getThemedClass('Lead'), styles.LeadFontSmall),
    };
  }

  return {
    Wrapper: getThemedClass('Wrapper'),
    ShortTitle: classNames(
      getThemedClass('ShortTitle'),
      getThemedClass('ShortTitleFont'),
    ),
    Title: classNames(getThemedClass('Title'), getThemedClass('TitleFont')),
    Lead: classNames(getThemedClass('Lead'), getThemedClass('Lead')),
  };
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
});

const TeaserText: TeaserTextComponent = connect(mapStateToProps)(
  teaserTextFactory({
    Link,
    styles: getStylesByProps,
  }),
);

export default TeaserText;
