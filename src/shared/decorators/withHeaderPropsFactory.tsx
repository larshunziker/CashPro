/**
 * This enhancer updates the redux header state via lifecycle hooks
 */

import { connect } from 'react-redux';

import { compose, lifecycle } from 'recompose';
import namedComponent from '../decorators/namedComponent';
import { WithHeaderProps } from './@types/withHeader';

const mapDispatchToProps = (options: WithHeaderProps) => ({
  setHeaderProps: options.setHeaderProps,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const updateHeaderProps = (props) => {
  const activeMenuTrail: ActiveMenuTrailItemEdge[] =
    (props &&
      ((props.article &&
        props.article.activeMenuTrail &&
        props.article.activeMenuTrail.edges) ||
        (props.landingPage &&
          props.landingPage.activeMenuTrail &&
          props.landingPage.activeMenuTrail.edges))) ||
    [];

  if (!(activeMenuTrail && activeMenuTrail.length > 0)) {
    return;
  }

  //ATTENTION; BEO IS USING THE FIRST ACTIVE MENU TRAIL ITEM AND NOT THE LAST!!!!
  const last = activeMenuTrail.filter((item) => item.node?.link).pop();

  props.setHeaderProps(last && last.node);
};

const withLifecycle = lifecycle<any, any>({
  // set and remove vertical header title based on current article channel
  componentDidMount() {
    updateHeaderProps(this.props);
  },
  componentDidUpdate() {
    updateHeaderProps(this.props);
  },
  componentWillUnmount() {
    this.props.setHeaderProps(null);
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (options) => (Component) =>
  compose<any, any>(
    namedComponent('withHeaderProps'),
    connect(undefined, mapDispatchToProps(options)),
    withLifecycle,
  )(Component);
