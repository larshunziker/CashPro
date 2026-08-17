import React, {
  Component,
  ReactElement,
  ReactNode,
  RefObject,
  createRef,
} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import { log } from '../../../shared/helpers/utils';
import scrollStateSelector from '../../../shared/selectors/scrollStateSelector';
import windowStateSelector from '../../../shared/selectors/windowStateSelector';
import {
  MONSTER_SKY_DEFAULT_MARGIN_TOP,
  MONSTER_SKY_POSITION_ABSOLUTE,
  MONSTER_SKY_POSITION_FIXED,
} from './constants';
import { AppNexusFactoryProps } from '../AppNexus/typings';
import {
  MonsterSkyComponent,
  MonsterSkyFactoryOptions,
  MonsterSkyFactoryOptionsStyles,
} from './typings';

type MonsterSkyPropsInner = Pick<AppNexusFactoryProps, 'excludeSizes'> & {
  windowWidth: number;
  scrollScrollTop: number;
  routeScreenReady: boolean;
  routeIsInitialPage: boolean;
  routePathname: string;
  isAdSuppressed?: boolean;
  isMultiPlacement?: boolean;
  children?: (props: MonsterSkyPropsInner) => ReactNode;
  addClass?: string;
};

type MonsterSkyState = {
  positionMode: string;
  visible: boolean;
  isSSR: boolean;
};

const defaultStyles: MonsterSkyFactoryOptionsStyles = {
  Wrapper: '',
  WrapperInner: '',
  AdWrapper: '',
  Ad: '',
  Sticky: '',
  Children: '',
};

export default ({
  AppNexus,
  locationStateSelector,
  slot,
  monsterSkyMinWindowWidth,
  monsterSkyMinMarginTop,
  styles: appStyles,
  shouldUpdate,
  positionModeOverride,
}: MonsterSkyFactoryOptions): MonsterSkyComponent => {
  class MonsterSky extends Component<MonsterSkyPropsInner, MonsterSkyState> {
    contentRef: RefObject<HTMLDivElement>;

    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    constructor(props) {
      super(props);

      this.state = {
        positionMode: MONSTER_SKY_POSITION_ABSOLUTE,
        visible: true,
        isSSR: true,
      };

      this.contentRef = createRef();
    }

    componentDidMount() {
      this.setState({ isSSR: false });
    }

    shouldComponentUpdate(
      nextProps: MonsterSkyPropsInner,
      nextState: MonsterSkyState,
    ): boolean {
      log(
        'monstersky',
        ['in should update of slot ' + slot, this.props, nextProps],
        'green',
      );

      // push screen ready changes to component
      if (
        this.props.windowWidth !== nextProps.windowWidth ||
        (!nextProps.routeIsInitialPage &&
          !this.props.routeScreenReady &&
          nextProps.routeScreenReady &&
          // on client, the pathname updates first and then the screen ready state
          // thats why pathname has to be identical to run a re-render
          // during hydration the initalPage is set to true so we should not re-render
          this.props.routePathname === nextProps.routePathname)
      ) {
        log('monstersky', 'detected a redux change', 'orange');
        return true;
      }

      // push position changes to component
      if (this.state.positionMode !== nextState.positionMode) {
        log('monstersky', 'detected a state change', 'orange');
        return true;
      }

      // update component if skyPositionEl is not defined
      if (this.contentRef.current === null) {
        log('monstersky', 'detected a contentRef change', 'orange');
        return true;
      }

      // detect new position mode
      // TODO: move this into componentDidUpdate to avoid setState calls in shouldUpdate
      // TODO: add raf.cancel() on componentWillUnmount
      raf((): void => {
        let newPositionMode = '';
        if (positionModeOverride) {
          newPositionMode = positionModeOverride;
        } else {
          newPositionMode =
            ((this.contentRef?.current &&
              this.contentRef.current.getBoundingClientRect()?.top) ||
              0) +
              MONSTER_SKY_DEFAULT_MARGIN_TOP <
              monsterSkyMinMarginTop && nextProps.scrollScrollTop > 0
              ? MONSTER_SKY_POSITION_FIXED
              : MONSTER_SKY_POSITION_ABSOLUTE;
        }

        // ignore, if position mode did not change
        if (newPositionMode !== this.state.positionMode) {
          // set new position mode
          this.setState({ positionMode: newPositionMode });
        }
      });

      if (shouldUpdate && typeof shouldUpdate === 'function') {
        return shouldUpdate(this.props, nextProps, this.state, nextState);
      }

      log('monstersky', 'update denied - global', 'green');
      return false;
    }

    getStyles(): MonsterSkyFactoryOptionsStyles {
      return (
        (typeof appStyles === 'function' &&
          appStyles(this.props, this.state)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles
      );
    }

    render(): ReactElement {
      const {
        windowWidth,
        isAdSuppressed = false,
        addClass = '',
        excludeSizes = null,
        isMultiPlacement,
      } = this.props;
      const { positionMode } = this.state;
      const styles = this.getStyles();

      // do not render ad, if minimum window space if not available
      if (windowWidth < monsterSkyMinWindowWidth || this.state.isSSR) {
        log(
          'monstersky',
          'min. width not reached - render placeholder',
          'orange',
        );
        return <div data-testid="monstersky-wrapper-server" />;
      }

      log('monstersky', 'min. width reached - render ad zone', 'green');

      return (
        <>
          <div className={classNames(styles.Wrapper, addClass)}>
            <div className={styles.WrapperInner}>
              <div className={styles.AdWrapper}>
                <div ref={this.contentRef} />
                {!isAdSuppressed && (
                  <div
                    className={classNames(
                      'ad-sky',
                      'ad-wrapper',
                      'ad-wrapper-tabletDesktop',
                      styles.Ad,
                      {
                        [styles.Sticky]:
                          positionMode === MONSTER_SKY_POSITION_FIXED,
                      },
                    )}
                  >
                    <AppNexus
                      slot={slot}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Record<string, string> | null' is not assignable to type 'Record<string, string> | undefined'. */
                      excludeSizes={excludeSizes}
                      deviceType="tabletDesktop"
                      isMultiPlacement={isMultiPlacement || false}
                    />
                  </div>
                )}

                {(this.props.children &&
                  typeof this.props.children === 'function' && (
                    <div className={classNames(styles.Children)}>
                      {this.props.children({ ...this.props })}
                    </div>
                  )) ||
                  null}
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    routeScreenReady: locationStateSelector(state).screenReady,
    routeIsInitialPage: locationStateSelector(state).isInitialPage,
    windowWidth: windowStateSelector(state).width,
    scrollScrollTop: scrollStateSelector(state).scrollTop,
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
  });

  return connect(mapStateToProps)(MonsterSky);
};
