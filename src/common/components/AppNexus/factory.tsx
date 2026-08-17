import React, { Component, ReactElement, createRef } from 'react';
import { connect } from 'react-redux';
import { UIDConsumer } from 'react-uid';
import { log } from '../../../shared/helpers/utils';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { viewportLabelSelector } from '../../../shared/selectors/windowStateSelector';
import { IAV_1, IAV_2, PREROLL_1 } from '../../../shared/constants/adZone';
import { APP_NEXUS_CLASS_PREFIX } from '../../../shared/constants/ads';
import {
  AppNexusComponent,
  AppNexusFactoryOptions,
  AppNexusFactoryOptionsStyles,
  AppNexusFactoryProps,
} from './typings';

type AppNexusSlot = Pick<AppNexusFactoryProps, 'excludeSizes'> & {
  slot: string;
  container: string;
  events?: AppNexusEvents;
  targeting?: ConfigMap;
  deviceType?: 'mobile' | 'tabletDesktop';
};

type AppNexusFactoryPropsInner = AppNexusFactoryProps & {
  routeScreenReady: boolean;
  routeIsInitialPage: boolean;
  routeLoading?: boolean;
  routePathname: string;
  viewportLabel: string;
  id?: string; // passed from UIDWrapper
};

type AppNexusState = {
  isSSR: boolean;
};

const defaultStyles: AppNexusFactoryOptionsStyles = {
  AdSlot: '',
};

// define whitelisted ad placements that can be used accross all device types
const WHITELISTED_PLACEMENTS_WITHOUT_DEVICE_TYPE = [PREROLL_1, IAV_1, IAV_2];

const appNexusFactory = ({
  mapViewportToAdViewport,
  styles: appStyles,
}: AppNexusFactoryOptions<any>) => {
  const convertToUnderScoredByNumber = (text: string): string => {
    return text
      .replace(/\.?(\d+)/g, function (x, y) {
        return '_' + y.toLowerCase();
      })
      .replace(/^_/, '');
  };

  class AppNexus extends Component<AppNexusFactoryPropsInner, AppNexusState> {
    observer: any;
    wrapperElement: any;
    count: number;

    constructor(props: AppNexusFactoryPropsInner) {
      super(props);
      this.observer = null;
      this.wrapperElement = createRef();
      this.count = 0;

      this.state = {
        isSSR: true,
      };
    }

    getStyles(): AppNexusFactoryOptionsStyles {
      return (
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles
      );
    }

    handleMutation() {
      if (!this.wrapperElement || !this.wrapperElement.current) {
        return;
      }

      this.count++;

      const parent = this.wrapperElement.current.closest('.ad-wrapper');
      if (parent) {
        if (this.wrapperElement.current.childElementCount) {
          parent.classList.add('slot-loaded');
        } else {
          parent.classList.remove('slot-loaded');
        }
      }
    }

    safeRegisterObserver() {
      if (this.props.routeScreenReady) {
        this.registerObserver();
      } else if (
        this.wrapperElement?.current &&
        this.wrapperElement.current?.childElementCount > 0
      ) {
        this.handleMutation();
      }
    }

    registerObserver() {
      if (!this.wrapperElement.current || this.observer) {
        return;
      }

      // create an observer instance
      this.observer = new MutationObserver((mutations: Array<any>): void => {
        mutations.forEach((): void => {
          this.handleMutation();
        });
      });

      // configuration of the observer:
      const config = { subtree: true, attributes: false, childList: true };

      // pass in the target node, as well as the observer options
      this.observer.observe(this.wrapperElement.current, config);
    }

    componentDidMount() {
      this.safeRegisterObserver();

      this.setState({
        isSSR: false,
      });
    }

    componentDidUpdate() {
      this.safeRegisterObserver();
    }

    componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'admConfig' implicitly has an 'any' type. */
    renderContainer(admConfig): ReactElement {
      log(
        'appnexus',
        'render ad container into the DOM: ' + admConfig.slot,
        'green',
      );

      const { AdSlot } = this.getStyles();

      return (
        <div
          ref={this.wrapperElement}
          className={AdSlot}
          data-testid="app-nexus-wrapper"
          data-device-type={this.props.deviceType}
          data-slot-name={admConfig.slot}
          data-slot-exclude-sizes={admConfig.excludeSizes}
          id={`${admConfig.container}${
            (this.props.deviceType && `-${this.props.deviceType}`) || ''
          }`}
          dangerouslySetInnerHTML={{ __html: '' }}
        />
      );
    }

    shouldComponentUpdate(nextProps: AppNexusFactoryPropsInner) {
      log(
        'appnexus',
        ['in should update of slot ' + nextProps.slot, this.props, nextProps],
        'green',
      );

      if (this.props.slot !== nextProps.slot && nextProps.routeScreenReady) {
        log('appnexus', 'detected slot change', 'orange');
        return true;
      }

      if (this.props?.id !== nextProps?.id && nextProps.routeScreenReady) {
        log('appnexus', 'detected UID change', 'orange');
        return true;
      }

      const currentAdViewport = mapViewportToAdViewport(
        this.props.viewportLabel,
      );
      const nextAdViewport = mapViewportToAdViewport(nextProps.viewportLabel);

      if (currentAdViewport !== nextAdViewport) {
        log('appnexus', 'detected viewport change', 'orange');
        return true;
      }

      // push screen ready changes to component
      if (
        !nextProps.routeIsInitialPage &&
        ((!this.props.routeScreenReady &&
          nextProps.routeScreenReady &&
          // on client, the pathname updates first and then the screen ready state
          // thats why pathname has to be identical to run a re-render
          // during hydration the initalPage is set to true so we should not re-render
          this.props.routePathname === nextProps.routePathname) ||
          // loading state is used/connected with new router logic only
          // that's why !routeLoading would be wrong
          nextProps?.routeLoading === false)
      ) {
        log('appnexus', 'detected a redux change', 'orange');
        return true;
      }

      log('appnexus', 'update denied - global', 'green');
      return false;
    }

    render() {
      if (this.props.isAdSuppressed) {
        log('appnexus', 'in render ads are suppressed', 'green');
        return null;
      }

      log('appnexus', 'in render', 'green');

      const {
        slot,
        isMultiPlacement,
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '"mobile" | "tabletDesktop"'. */
        deviceType = null,
        excludeSizes,
      }: AppNexusFactoryPropsInner = this.props;

      if (!slot) return null;

      // just a few ad placements are allowed to be used w/o a device type definition
      if (
        !deviceType &&
        !WHITELISTED_PLACEMENTS_WITHOUT_DEVICE_TYPE.includes(slot)
      ) {
        log(
          'appnexus',
          `no device type specified for ad slot '${slot}'! ad will not be requested!`,
          'red',
        );
        return null;
      }

      const apnSlot = convertToUnderScoredByNumber(slot);

      let apnContainer = `${APP_NEXUS_CLASS_PREFIX}${apnSlot
        .replace('_', '-')
        .toLowerCase()}`;

      if (isMultiPlacement && this.props?.id) {
        apnContainer = apnContainer + `-${this.props?.id || ''}`;
      }

      const admConfig: AppNexusSlot = {
        excludeSizes,
        slot: apnSlot,
        container: apnContainer,
      };

      if (isMultiPlacement) {
        log(
          'appnexus',
          'is multiplacement - suffixed container with UID ' +
            admConfig.container,
          'green',
        );
      }

      return this.renderContainer(admConfig);
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    routeLoading: locationStateSelector(state).loading,
    routeScreenReady: locationStateSelector(state).screenReady,
    routeIsInitialPage: locationStateSelector(state).isInitialPage,
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
    viewportLabel: viewportLabelSelector(state),
  });

  const UIDWrapper: AppNexusComponent = (props: AppNexusFactoryPropsInner) => {
    if (!props.slot) {
      return null;
    }
    if (!props.isMultiPlacement) {
      return <AppNexus {...props} />;
    }

    return (
      <UIDConsumer>
        {(id) => {
          return <AppNexus {...props} id={id} />;
        }}
      </UIDConsumer>
    );
  };

  return connect(mapStateToProps)(UIDWrapper);
};

export default appNexusFactory;
