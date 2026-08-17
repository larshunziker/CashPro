import { connect } from 'react-redux';

import { compose, lifecycle } from 'recompose';
import { setHeaderProps } from '../../../shared/actions/header';

export type WithHeaderProps = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  setHeaderProps: (props) => void;
};

const mapDispatchToProps = {
  setHeaderProps,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'scope' implicitly has an 'any' type. */
const updateHeaderProps = (scope): void => {
  const activeMenuTrail: ActiveMenuTrailItemEdge[] =
    (scope.props &&
      ((scope.props.article &&
        scope.props.article.activeMenuTrail &&
        scope.props.article.activeMenuTrail.edges) ||
        (scope.props.landingPage &&
          scope.props.landingPage.activeMenuTrail &&
          scope.props.landingPage.activeMenuTrail.edges))) ||
    [];

  if (!(activeMenuTrail && activeMenuTrail.length > 0)) {
    return;
  }

  const [first]: ActiveMenuTrailItemEdge[] = activeMenuTrail;

  scope.props.setHeaderProps(first && first.node);
};

const withLifecycle = lifecycle<any, any>({
  // set and remove vertical header title based on current article channel
  componentDidMount() {
    updateHeaderProps(this);
  },
  componentDidUpdate() {
    updateHeaderProps(this);
  },
  componentWillUnmount() {
    this.props.setHeaderProps(null);
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
const WithHeaderProps = (Component) =>
  compose<any, any>(
    connect(undefined, mapDispatchToProps),
    withLifecycle,
  )(Component);

export default WithHeaderProps;
