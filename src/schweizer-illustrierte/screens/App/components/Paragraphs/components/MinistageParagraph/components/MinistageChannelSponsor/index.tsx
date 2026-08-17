import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import ClientSideOnly from '../../../../../../../../../common/components/ClientSideOnly';
import Link from '../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../common/components/Picture';
import SuspenseFallback from '../../../../../../../../../common/components/SuspenseFallback';
import {
  TRACKING_CLASS_MINISTAGE_CHANNEL_SPONSOR_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ChannelSponsorProps, MinistageChannelSponsorProps } from './typings';

const MinistageChannelSponsorSlider = lazy(
  () =>
    import(
      /* webpackChunkName: "MinistageChannelSponsorSlider" */ '../MinistageChannelSponsorSlider'
    ),
);

type MinistageChannelSponsorPropsInner = MinistageChannelSponsorProps & {
  routePathname: string;
  activeMainChannel: string;
};

export const ChannelSponsor = ({
  item,
  index,
  standalone,
  slideIndex,
}: ChannelSponsorProps) =>
  Array.isArray(item.sponsors) &&
  item.sponsors.length > 0 && (
    <div
      key={`channel-sponsor-stage-${index}-${slideIndex}`}
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_CHANNEL_SPONSOR_PARAGRAPH,
        styles.Wrapper,
        {
          [styles.StandaloneWrapper]: !!standalone,
        },
      )}
    >
      <p className={styles.Title}>{item.title}</p>
      <span
        className={styles.SubTitle}
        dangerouslySetInnerHTML={{ __html: item.subtitle }}
      />
      <div className={styles.Logos}>
        {item.sponsors.map((sponsor) => (
          <Link
            path={sponsor.link}
            rel="sponsored"
            className={styles.LogoWrapper}
            key={`channel-sponsor-stage-logo-${sponsor.link || sponsor.name}`}
          >
            <Picture
              url={sponsor.logoUrl}
              alt={sponsor.name}
              className={styles.Logo}
              disableWrapperClassName
            />
          </Link>
        ))}
      </div>
    </div>
  );

class MinistageChannelSponsor extends Component<MinistageChannelSponsorPropsInner> {
  shouldComponentUpdate(nextProps: MinistageChannelSponsorPropsInner) {
    return this.props.activeMainChannel !== nextProps.activeMainChannel;
  }

  render() {
    const { asSlider = false, items = [], routePathname } = this.props;

    if (!Array.isArray(items) || items.length === 0) {
      return null;
    }

    return (
      <div
        className={classNames(
          grid.Container,
          styles.MinistageChannelSponsorSliderWrapper,
        )}
        data-testid="wrapper"
        key={`channel-sponsor-slider-wrapper-${routePathname}`}
      >
        {asSlider ? (
          <ClientSideOnly>
            <Suspense fallback={<SuspenseFallback size="small" />}>
              <MinistageChannelSponsorSlider items={items} />
            </Suspense>
          </ClientSideOnly>
        ) : (
          items.map((item, index) => (
            /* @ts-ignore TODO: TS2786 ->  'ChannelSponsor' cannot be used as a JSX component. */
            <ChannelSponsor
              key={`channel-sponsor-item-${routePathname}`}
              item={item}
              standalone
              index={index}
              slideIndex={index}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(MinistageChannelSponsor);
