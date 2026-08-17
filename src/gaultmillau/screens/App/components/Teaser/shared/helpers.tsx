import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../../shared/helpers/utils';
import Icon from '../../Icon';
import ShortTitle from './components/ShortTitle';
import { ORGANIZATION_CONTENT_TYPE } from '../../../../../../shared/constants/content';
import { ORGANIZATION_TYPE_POP } from '../../../screens/PopRestaurants/constants';
import { TEASER_LEAD_LENGTH } from '../constants';
import { getStyleByType } from './constants';
import gaultMillauIcons from '../../../assets/styles/gaultMillau.legacy.css';
import teaserDefaultStyles from './defaultStyles.legacy.css';
import { TeaserProps } from './typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
export const ensureTeaserInterfaceItem = (item, index?: number) => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  // @TODO: Type correctly as soon as NodeInteface is defined
  const node = { ...item, ...item.node };

  // the link path is mapped on the preferredUri because of the tealium tracking for external teasers
  const preferredUri = node.preferredUri || node.link?.path || '';
  const channelTitle = node.channel && node.channel.title;

  let createDate = node.publicationDate || node.createDate;
  if (node.showUpdated && node.changeDate) {
    createDate = node.changeDate;
  }

  let secondaryName = '';
  let lead = node.lead;

  if (
    node.__typename === ORGANIZATION_CONTENT_TYPE &&
    node.organizationType !== ORGANIZATION_TYPE_POP
  ) {
    createDate = node.foundationDate || '';
    secondaryName =
      (node.organizationData && node.organizationData.secondaryName) || '';
    lead = `${(node.address ? `${node.address}, ` : '') + node.zipCode} ${
      node.city
    }`;
  }

  const result = {
    itemIndex: index,
    ...item,
    ...(item?.node || {}),
    createDate,
    lead,
    secondaryName,
    title: node.title,
    shortTitle: node.shortTitle || channelTitle || '',
    teaserImage: (!node?.isHeadless && node.teaserImage) || null,
    preferredUri,
  };

  // used for the RelatedContent component, since we no longer fetch the teaserImage we have to create this mapping
  if (
    Array.isArray(result.heroImageBody) &&
    result.heroImageBody[0] &&
    !result.teaserImage
  ) {
    result.teaserImage = {
      image:
        result.heroImageBody[0]?.image ||
        result.heroImageBody[0]?.gallery?.body?.[0]?.image ||
        null,
    };
  }

  return result;
};

/**
 * ensure teaser interface
 *
 * @desc    makes sure, that all required props for teaser renderings are present
 * @param   {Array<any>} nodes
 * @returns {Array<TeasableInterfaceGraphList>}
 */
export const ensureTeaserInterface = (
  nodes: Array<any>,
): TeasableInterfaceGraphList[] => {
  if (!nodes || typeof nodes !== 'object' || nodes.length < 1) {
    return nodes;
  }

  // ensure that all required fields are present
  return nodes.map(ensureTeaserInterfaceItem);
};

export const getInnerContentByProps = (leadStyle: string) => {
  const getInnerContentByPropsInner = ({
    description,
    lead,
    secondaryName,
  }: TeaserProps): ReactElement => {
    if (!description && !secondaryName && !lead) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <>
        {secondaryName && (
          <p className={leadStyle}>
            {truncateByWord(secondaryName, TEASER_LEAD_LENGTH)}
          </p>
        )}
        {lead && (
          <p className={leadStyle}>
            {truncateByWord(lead, TEASER_LEAD_LENGTH)}
          </p>
        )}
        {description && (
          <div
            className={leadStyle}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
      </>
    );
  };
  return getInnerContentByPropsInner;
};

export const getIconAndBorderByProps = (iconStyle: string) => {
  const getIconAndBorderByPropsInner = ({
    hasVideo,
    __typename,
    organizationType,
    teaserType,
    subtypeValue,
  }: TeaserProps): ReactElement => {
    const styleByType = getStyleByType({
      __typename,
      organizationType,
      teaserType,
      subtypeValue,
    });

    if (!hasVideo && !styleByType) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <>
        {hasVideo && (
          <Icon
            type="IconPlay"
            iconsOverride={gaultMillauIcons}
            addClass={iconStyle}
          />
        )}
        {styleByType && (
          <div
            className={classNames(
              teaserDefaultStyles.Border,
              teaserDefaultStyles[`${styleByType}Border`],
            )}
          />
        )}
      </>
    );
  };
  return getIconAndBorderByPropsInner;
};

export const getShortTitleElementByProps = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'styles' implicitly has an 'any' type. */
  styles,
  wrapperStyle = '',
  origin = '',
) => {
  const getShortTitleElementByPropsInner = ({
    __typename,
    subtypeValue,
    title,
    preferredUri,
    shortTitle = '',
    authors,
    teaserType,
    organizationData,
    organizationType,
    restaurantType,
    cityList,
    sponsor,
    channel,
  }: TeaserProps): ReactElement => {
    return (
      <ShortTitle
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        __typename={__typename}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        subtypeValue={subtypeValue}
        title={title}
        preferredUri={preferredUri}
        shortTitle={shortTitle}
        authors={authors}
        teaserType={teaserType}
        organizationData={organizationData}
        organizationType={organizationType}
        restaurantType={restaurantType}
        cityList={cityList}
        sponsor={sponsor}
        channel={channel}
        styles={styles}
        wrapperStyle={wrapperStyle}
        origin={origin}
      />
    );
  };
  return getShortTitleElementByPropsInner;
};
