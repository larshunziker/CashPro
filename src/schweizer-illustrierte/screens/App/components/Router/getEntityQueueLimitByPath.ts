import {
  ROUTE_BODY_HEALTH,
  ROUTE_ENTERTAINMENT,
  ROUTE_FAMILY,
  ROUTE_HOME,
  ROUTE_PEOPLE,
  ROUTE_STYLE,
} from '../../../App/constants';

const getEntityQueueLimitByPath = (pathname: string) => {
  switch (pathname) {
    case ROUTE_HOME:
      return 18;
    case ROUTE_PEOPLE:
      return 15;
    case ROUTE_ENTERTAINMENT:
      return 13;
    case ROUTE_STYLE:
      return 20;
    case ROUTE_FAMILY:
    case ROUTE_BODY_HEALTH:
      return 7;
    default:
      return -1;
  }
};

export default getEntityQueueLimitByPath;
