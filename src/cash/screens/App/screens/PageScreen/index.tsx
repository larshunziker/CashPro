import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import compose from 'recompose/compose';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  MARKETING_PAGE,
  MARKETING_PAGE_DEFAULT_HEADER,
  setVertical,
} from '../../../../shared/actions/route';
import PageScreenDefault from './components/PageScreenDefault';
import PageScreenMarketing from './components/PageScreenMarketing';
import {
  ADVERTISING_TYPE_LONGFORM,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
} from '../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { PageScreenProps } from './typings';

type PageScreenPropsInner = PageScreenProps;

const PageScreen = (props: PageScreenPropsInner) => {
  const { subtypeValue } = props.pageScreen;
  const dispatch = useDispatch();

  const routePathname = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.pathname,
  );

  useEffect(() => {
    // updates the vertical value in the route state to marketing_page
    // this is important because we don't want to render ads on these pages
    switch (subtypeValue) {
      case PAGE_TYPE_MARKETING:
        dispatch(setVertical(MARKETING_PAGE));
        break;

      case ADVERTISING_TYPE_LONGFORM:
      case PAGE_TYPE_MARKETING_DEFAULT_HEADER:
        dispatch(setVertical(MARKETING_PAGE_DEFAULT_HEADER));
        break;
    }
  }, [dispatch, subtypeValue]);

  if (
    [
      PAGE_TYPE_MARKETING,
      PAGE_TYPE_MARKETING_DEFAULT_HEADER,
      ADVERTISING_TYPE_LONGFORM,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    ].includes(subtypeValue)
  ) {
    return <PageScreenMarketing {...props} routePathname={routePathname} />;
  }
  return <PageScreenDefault {...props} routePathname={routePathname} />;
};

export default compose<any, any>(
  withHelmet({
    getNode: ({ pageScreen }: PageScreenPropsInner) => pageScreen,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
  }),
)(memo(PageScreen));
