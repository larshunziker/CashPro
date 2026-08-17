import React, { Component, ReactElement } from 'react';

import { compose } from 'recompose';
import { generateMetaLinks } from '../../../../../shared/helpers/withHelmet';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import OverviewPage from '../../components/OverviewPage';
import PartnerBanner from '../../components/PartnerBanner';
import StatusPage from './../StatusPage';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { OVERVIEW_PAGE_SIZE } from '../../components/TeaserGrid/constants';
import { SITE_TITLE } from '../../constants';
import { ChannelProps } from './typings';

type ChannelPropsInner = ChannelProps;

const getFallbackTitle = (channel: Channel) =>
  `${
    channel?.landingPage?.metaTitle || channel?.settings?.title || ''
  } - ${SITE_TITLE}`;

/* @ts-ignore TODO: TS7031 ->  Binding element 'channel' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'page' implicitly has an 'any' type. */
const getFallbackHelmetNode = ({ channel, location, page }) => {
  const numberCount: number = channel?.entities?.count || 0;
  const totalOfPages: number = Math.ceil(numberCount / OVERVIEW_PAGE_SIZE);
  const metaLink: Array<MetaLink> = generateMetaLinks(
    location,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | undefined'. */
    null,
    page,
    totalOfPages,
  );
  const fallbackTitle = getFallbackTitle(channel);
  const description = channel?.settings?.lead || '';

  return {
    seoTitle: fallbackTitle,
    metaDescription: description,
    heroImageBody: [
      {
        image: {
          file: {
            relativeOriginPath:
              channel?.settings?.headerImage?.file?.relativeOriginPath,
          },
        },
      },
    ],
    metaLink,
    preferredUri: location.pathname,
  };
};

class ChannelComponent extends Component<
  ChannelPropsInner & Pick<RouterProps, 'location'>
> {
  render(): ReactElement {
    const { channel, location, page } = this.props;

    if (
      !channel ||
      !channel?.entities ||
      !Array.isArray(channel?.entities?.edges) ||
      !channel?.entities?.edges.length
    ) {
      return <StatusPage />;
    }

    return (
      <TestFragment data-testid="channel-container">
        {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */}
        <EditButtons editContentUri={channel.editContentUri} />

        {channel.preferredUri && channel.activeMenuTrail && (
          <TestFragment data-testid="channel-breadcrumb-wrapper">
            <Breadcrumbs
              pageUrl={channel.preferredUri}
              /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
              items={channel.activeMenuTrail}
            />
          </TestFragment>
        )}

        {channel?.settings?.channel?.sponsors?.edges &&
          Array.isArray(channel?.settings?.channel?.sponsors?.edges) && (
            <TestFragment data-testid="channel-partnerbanner-wrapper">
              <PartnerBanner
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<SponsorEdge>[]' is not assignable to type 'SponsorEdge[]'. */
                sponsors={channel?.settings?.channel?.sponsors?.edges || []}
              />
            </TestFragment>
          )}

        <OverviewPage location={location} page={page} routeObject={channel} />
      </TestFragment>
    );
  }
}

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps): LandingPage =>
      mapProps.channel?.landingPage || getFallbackHelmetNode(mapProps),
    getFallbackTitle: (mapProps: ChannelPropsInner): string =>
      getFallbackTitle(mapProps.channel),
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.landingPage?.grid?.edges || [],
  }),
)(ChannelComponent);
