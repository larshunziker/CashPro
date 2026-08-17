import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import raf from 'raf';
import { scrollToAnchorElement } from '../../common/components/SmoothScroll/helpers';
import locationStateSelector from '../selectors/locationStateSelector';

interface WithScrollOnLoadHoCProps {
  isAccessGranted?: boolean;
  location?: RaschRouterLocation;
  loading?: boolean;
}

export type ScrollConfig = {
  offset?: number;
  behavior?: string;
  scrollToTopAnchorId?: string;
  replace?: boolean;
};

const withScrollOnLoad =
  (config: ScrollConfig) =>
  (InnerComponent: ComponentType<WithScrollOnLoadHoCProps>) => {
    class WithScrollOnLoadHoC extends Component<WithScrollOnLoadHoCProps> {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      constructor(props) {
        super(props);
      }

      scrollToAnchor() {
        const scrollConfig =
          global.location.hash === '#page'
            ? {
                ...config,
                behavior: 'auto',
              }
            : config;

        if (this.props.hasOwnProperty('isAccessGranted')) {
          const { isAccessGranted } = this.props;
          if (isAccessGranted) {
            raf(() => {
              scrollToAnchorElement(
                `${decodeURIComponent(global.location.hash).replace('#', '')}`,
                scrollConfig,
              );
            });
          }
        } else {
          raf(() => {
            scrollToAnchorElement(
              `${decodeURIComponent(global.location.hash).replace('#', '')}`,
              scrollConfig,
            );
          });
        }
      }

      componentDidMount() {
        if (global?.location?.hash) {
          this.scrollToAnchor();
        }
      }

      componentDidUpdate() {
        if (global?.location?.hash) {
          this.scrollToAnchor();
        }
      }

      shouldComponentUpdate(nextProps: WithScrollOnLoadHoCProps): boolean {
        return (
          (this.props.hasOwnProperty('isAccessGranted') &&
            this.props.isAccessGranted !== nextProps.isAccessGranted) ||
          this.props?.location?.hash !== global.location.hash ||
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          this.props?.location?.href !== nextProps?.location.href ||
          (this.props?.location?.href === nextProps?.location.href &&
            JSON.stringify(this.props.location.query) !==
              JSON.stringify(nextProps.location.query) &&
            !nextProps.loading)
        );
      }

      render() {
        return <InnerComponent {...this.props} />;
      }
    }

    const mapStateToProps = (state: ReduxState) => ({
      loading: locationStateSelector(state).loading,
    });

    return connect(mapStateToProps)(WithScrollOnLoadHoC);
  };

export default withScrollOnLoad;
