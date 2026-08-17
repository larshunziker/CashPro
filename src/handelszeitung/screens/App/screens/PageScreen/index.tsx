import React, { memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  MARKETING_PAGE,
  MARKETING_PAGE_DEFAULT_HEADER,
  setVertical,
} from '../../../../shared/actions/route';
import PageScreenDefault from './components/PageScreenDefault';
import PageScreenMarketing from './components/PageScreenMarketing';
import PageScreenSv from './components/PageScreenSv';
import {
  ADVERTISING_TYPE_LONGFORM,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
} from '../../../../../shared/constants/content';
import {
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../shared/constants/publications';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { PageScreenProps } from './typings';

type PageScreenPropsInner = PageScreenProps & {
  setVertical: (vertical: string) => Record<string, any>;
  routePathname: string;
};

const PageScreen = (props: PageScreenPropsInner) => {
  const { subtypeValue } = props.pageScreen;
  const { routePathname } = props;
  const setVerticalRef = useRef(props.setVertical);

  useEffect(() => {
    // updates the vertical value in the route state to marketing_page
    // this is important because we don't want to render ads on these pages
    switch (subtypeValue) {
      case PAGE_TYPE_MARKETING:
        setVerticalRef.current(MARKETING_PAGE);
        break;

      case ADVERTISING_TYPE_LONGFORM:
      case PAGE_TYPE_MARKETING_DEFAULT_HEADER:
        setVerticalRef.current(MARKETING_PAGE_DEFAULT_HEADER);
        break;
    }

    // the vertical value also gets updated "onLocationChange" and this usually happens after this hook ran. The way we fixed this issue now, is to also run the hook, when the routePathtname changes.
  }, [subtypeValue, routePathname]);
  if (
    [
      PAGE_TYPE_MARKETING,
      PAGE_TYPE_MARKETING_DEFAULT_HEADER,
      ADVERTISING_TYPE_LONGFORM,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    ].includes(subtypeValue)
  ) {
    return <PageScreenMarketing {...props} />;
  }

  switch (props.pageScreen?.publication) {
    case PUBLICATION_SWISS_INSURANCE:
    case PUBLICATION_HZB:
      return <PageScreenSv {...props} />;
    default:
      return <PageScreenDefault {...props} />;
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

const mapDispatchToProps: Record<string, any> = {
  setVertical,
};

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHelmet({
    getNode: ({ pageScreen }: PageScreenPropsInner) => pageScreen,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
  }),
)(memo(PageScreen));
