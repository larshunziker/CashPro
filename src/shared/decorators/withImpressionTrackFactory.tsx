import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import { replaceTrackingUrlPlaceholders } from '../helpers/tracking';
import namedComponent from './namedComponent';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
const track = ({ node }) => {
  if (node && node.trackingTeaserImpression) {
    fetch(replaceTrackingUrlPlaceholders(node.trackingTeaserImpression), {
      mode: 'no-cors',
    });
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'propName' implicitly has an 'any' type. */
const doTrack = (props, propName) => {
  if (!propName) {
    return props;
  }

  const teaserPath = propName.split('.');

  const nodes = teaserPath.reduce(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
    (acc, value) => (acc && acc[value]) || null,
    props,
  );

  if (nodes && Array.isArray(nodes)) {
    nodes.forEach(track);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'propName' implicitly has an 'any' type. */
const withMapProps = (propName) =>
  lifecycle<any, any>({
    componentDidMount() {
      if (this.props.locationState?.screenReady === true) {
        doTrack(this.props, propName);
      }

      return this.props;
    },
    /* @ts-ignore TODO: TS7006 ->  Parameter 'prevProps' implicitly has an 'any' type. */
    componentDidUpdate(prevProps) {
      if (
        this.props.locationState?.screenReady !==
          prevProps.locationState?.screenReady &&
        this.props.locationState?.screenReady === true
      ) {
        doTrack(this.props, propName);
      }
    },
  });

const extendWithHandlers = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'propName' implicitly has an 'any' type. */
  trackImpression: (props) => (propName) => doTrack(props, propName),
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (options) => (state) => ({
  locationState: options.locationStateSelector(state),
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
export default (options) =>
  /* @ts-ignore TODO: TS7031 ->  Binding element 'propName' implicitly has an 'any' type. */
  ({ propName }) =>
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
  (Component) =>
    (__CLIENT__ &&
      compose<any, any>(
        connect(mapStateToProps(options)),
        extendWithHandlers,
        namedComponent('withImpressionTrack'),
        withMapProps(propName),
      )(Component)) ||
    Component;
