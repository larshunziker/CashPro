import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { getFallbackTitle } from './helpers';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import { setVerticalTitle } from '../../../../shared/actions/header';
import OrganizationPop from './screens/Pop';
import OrganizationRestaurant from './screens/Restaurant';
import { OrganizationPropsInner } from './typings';

const OrganizationDetail = (props: OrganizationPropsInner) => {
  if (props.organization.organizationType === 'pop') {
    return <OrganizationPop {...props} />;
  }

  return <OrganizationRestaurant {...props} />;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const mapDispatchToProps = {
  setVerticalTitle,
};

const withLifecycle = lifecycle<any, any>({
  // set and remove vertical header title based on current recipe channel
  componentDidMount() {
    this.props.setVerticalTitle(
      (this.props && this.props.organization) ||
        getFallbackTitle(this.props.organization),
    );
  },
  componentWillUnmount() {
    this.props.setVerticalTitle('');
  },
});

const OrganizationWrapper = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withLifecycle,
  injectIntl,
)(OrganizationDetail);

export default OrganizationWrapper;
