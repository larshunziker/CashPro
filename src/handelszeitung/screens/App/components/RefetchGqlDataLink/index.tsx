import { connect } from 'react-redux';
import refetchGqlDataLinkFactory from '../../../../../common/components/RefetchGqlDataLink/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import { setIsRefetchingData } from '../../../../../shared/actions/route';
import Link from '../../../../../common/components/Link';
import {
  RefetchGqlDataLinkFactoryOptions,
  RefetchGqlDataLinkProps,
} from '../../../../../common/components/RefetchGqlDataLink/typings';

type RefetchGqlDataLinkPropsInner = RefetchGqlDataLinkProps & {
  routePathname: string;
  setIsRefetchingData: (isRefetching: boolean) => void;
};

const factoryOptions: RefetchGqlDataLinkFactoryOptions<RefetchGqlDataLinkPropsInner> =
  {
    Link,
    setIsRefetchingData: (isRefetching, props) =>
      props.setIsRefetchingData(isRefetching),
    getRoutePathname: (props) => props.routePathname,
    shouldRerender: (props, nextProps) =>
      props.routePathname !== nextProps.routePathname ||
      props.children !== nextProps.children,
  };

const RefetchGqlDataLink = refetchGqlDataLinkFactory(factoryOptions);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

const mapDispatchToProps = {
  setIsRefetchingData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RefetchGqlDataLink);
