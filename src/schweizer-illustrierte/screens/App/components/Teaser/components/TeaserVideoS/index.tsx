import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryOptionsStyles,
} from '../../../../../../../common/components/Teaser/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Icon from '../../../Icon';
import { STYLE_16X9_220 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { GetElementByProps } from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { TeaserVideoSProps } from './typings';

type TeaserVideoSPropsInner = TeaserVideoSProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStylesByProps = (
  props: TeaserVideoSPropsInner,
): TeaserFactoryOptionsStyles => {
  const { activeMainChannel }: TeaserVideoSPropsInner = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    ImageWrapper: styles.ImageWrapper,
    ShortTitle: getThemedClass('ShortTitle'),
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    Title: getThemedClass('Title'),
    Wrapper: styles.Wrapper,
  };
};

const getIconByProps: GetElementByProps<TeaserVideoSPropsInner> = ({
  isActive,
}) => (
  <Icon
    type="IconMovieButton"
    addClass={classNames(styles.VideoIcon, { [styles.IsActive]: isActive })}
  />
);

const TeaserVideoS = teaserFactory({
  icon: getIconByProps,
  styles: getStylesByProps,
  teaserImageStyles: { style_320: STYLE_16X9_220 },
}) as ComponentType<TeaserVideoSPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserVideoS));
