import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import compose from 'recompose/compose';
import raf from 'raf';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from '../../components/Helmet';
import styles from './styles.legacy.css';

type EventsCalendarPropsInner = {
  routePathname: string;
  setLoading: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady: (screenReady: boolean, trackingData: TaeliumData) => Action;
};

class EventsCalendar extends React.Component<EventsCalendarPropsInner> {
  iframe;

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  constructor(props) {
    super(props);
    this.iframe = createRef();
  }

  loadEventsCalendar = () => {
    const iframeBody =
      /* @ts-ignore TODO: TS2571 ->  Object is of type 'unknown'. */
      this.iframe.current?.contentWindow?.document?.body || null;
    if (iframeBody) {
      const postMessageScript = document.createElement('script');
      const inlineScript = document.createTextNode(
        'setInterval(function() {window.top.postMessage(document.body.scrollHeight, "*");}, 500);',
      );
      postMessageScript.appendChild(inlineScript);
      iframeBody.appendChild(postMessageScript);
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  resizeIframe = (event) => {
    if (this.iframe.current) {
      const scrollHeight = event.data;
      /* @ts-ignore TODO: TS2571 ->  Object is of type 'unknown'. */
      this.iframe.current.style.height = scrollHeight + 'px';
    }
  };

  componentDidMount() {
    if (__CLIENT__) {
      global.addEventListener('message', this.resizeIframe, false);
    }
    raf(() => {
      this.props.setLoading(false);
      this.props.setScreenReady(true, {
        pathname: this.props.routePathname,
        ...getTealiumData({
          object: {
            preferredUri: this.props.routePathname,
            __typename: 'EventsCalendar',
          },
        }),
      });
    });
  }

  componentWillUnmount() {
    global.removeEventListener('message', this.resizeIframe);
  }

  render() {
    return (
      <div className={styles.Wrapper}>
        <Helmet title="Veranstaltungskalender" />

        <div className={styles.EventsCalendarWrapper}>
          <iframe
            /* @ts-ignore TODO: TS2322 ->  Type 'RefObject<unknown>' is not assignable to type 'LegacyRef<HTMLIFrameElement> | undefined'. */
            ref={this.iframe}
            className={styles.EventsCalendarIframe}
            title="Veranstaltungskalender"
            onLoad={this.loadEventsCalendar}
            src="/evenito/"
            scrolling="no"
          />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  setLoading,
  setScreenReady,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

const withStoreConnection = connect(mapStateToProps, mapDispatchToProps);

export default compose<any, any>(
  withStoreConnection,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'EventsCalendar',
      }),
  }),
  withHelmet({}),
)(EventsCalendar);
