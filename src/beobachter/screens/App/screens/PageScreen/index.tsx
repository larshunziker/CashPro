import React, { memo } from 'react';
import compose from 'recompose/compose';
import withHelmet from '../../../../shared/decorators/withHelmet';
import PageScreenBooking from './components/PageScreenBooking';
import PageScreenDefault from './components/PageScreenDefault';
import PageScreenMarketing from './components/PageScreenMarketing';
import { Newsletter } from '../../components/Newsletter';
import {
  ADVERTISING_TYPE_LONGFORM,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
} from '../../../../../shared/constants/content';
import {
  BOOKING_FORM_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
} from '../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import {
  NEWSLETTER_LOGIN_IFRAME,
  ROUTE_NEWSLETTER_PAGE,
} from '../../constants';
import { PageScreenProps } from './typings';

type PageScreenPropsInner = PageScreenProps & {
  setVertical: (vertical: string) => Record<string, any>;
  routePathname: string;
};

export function pageBreadcrumbsData(data: any): any {
  data.breadcrumbsData = {
    label: data?.environment?.routeByPath?.object?.title || '',
  };
}

const PageScreen = (props: PageScreenPropsInner) => {
  const { subtypeValue } = props.pageScreen;
  const isNewsletterPage = props.location?.pathname?.startsWith(
    '/' + ROUTE_NEWSLETTER_PAGE,
  );

  if (
    [
      PAGE_TYPE_MARKETING,
      PAGE_TYPE_MARKETING_DEFAULT_HEADER,
      ADVERTISING_TYPE_LONGFORM,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    ].includes(subtypeValue)
  ) {
    if (isNewsletterPage && NEWSLETTER_LOGIN_IFRAME) {
      return (
        <>
          <PageScreenMarketing {...props} />
          <Newsletter />
        </>
      );
    }
    return <PageScreenMarketing {...props} />;
  }

  const bookingFormEntry = props.pageScreen?.body?.find((entry: any) => {
    return (
      entry?.__typename === INPUT_FORM_PARAGRAPH &&
      entry.form === BOOKING_FORM_PARAGRAPH
    );
  });

  if (bookingFormEntry) {
    return <PageScreenBooking {...props} bookingFormEntry={bookingFormEntry} />;
  }

  return (
    <>
      <PageScreenDefault {...props} />
    </>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: ({ pageScreen }: PageScreenPropsInner) => pageScreen,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
  }),
)(memo(PageScreen));
