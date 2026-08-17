import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { truncateInBetween } from '../../../../../../shared/helpers/utils';
import cssClassByChannel from '../../../../../shared/helpers/cssClassByChannel';
import ArrowButton from '../../ArrowButton';
import Badge from '../../Badge';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_EXTERNAL,
  ADVERTISING_TYPE_LONGFORM,
  IMAGE_GALLERY_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../shared/constants/content';
import {
  PUBLICATION_BEOBACHTER,
  PUBLICATION_BIL,
  PUBLICATION_GM,
  PUBLICATION_HZ,
} from '../../../../../../shared/constants/publications';
import { ADVERTORIAL, MAIN_CHANNEL_STYLE } from '../../../../App/constants';
import { ARROW_BUTTON_THEME_SKIN } from '../../ArrowButton/constants';
import { TEASER_ARROW_BUTTON_ORIGIN } from '../constants';
import grid from '../../../../../../common/assets/styles/grid.legacy.css';
import { TeaserFactoryProps } from '../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../shared/types';

const additionalPublications: Array<string> = [
  PUBLICATION_GM,
  PUBLICATION_BEOBACHTER,
  PUBLICATION_BIL,
  PUBLICATION_HZ,
];

// this is the same typings as all teaser variations e.g. TeaserS, TeaserXL etc.
type TeaserProps = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
export const ensureTeaserInterface = (node): TeaserInterface => {
  const teaserImage =
    (!node?.isHeadless &&
      ((node?.__typename === KEYWORD_CONTENT_TYPE && {
        image: {
          file: {
            alt: node?.settings?.headerImage?.file?.alt || '',
            relativeOriginPath:
              node?.settings?.headerImage?.file?.relativeOriginPath || '',
            focalPointX: node?.settings?.headerImage?.file?.focalPointX,
            focalPointY: node?.settings?.headerImage?.file?.focalPointY,
          },
        },
      }) ||
        node?.teaserImage ||
        node?.node?.teaserImage)) ||
    null;

  return {
    title: node?.label || '',
    // the link path is mapped on the preferredUri because of the tealium tracking for external teasers
    preferredUri: node?.preferredUri || node?.link?.path || '',
    ...node,
    shortTitle:
      (node?.__typename === KEYWORD_CONTENT_TYPE && 'Dossier') ||
      (node?.__typename === RECIPE_CONTENT_TYPE && 'Rezepte') ||
      node?.shortTitle ||
      (node?.__typename === NATIVE_ADVERTISING_CONTENT_TYPE &&
        node?.subtypeValue !== ADVERTISING_TYPE_ADVERTORIAL &&
        node?.advertisingTypeLabel) ||
      node?.channel?.title ||
      '',
    channel: node?.channel || null,
    style: node?.style || '',
    teaserImage,
  };
};
/* @ts-ignore TODO: TS7006 ->  Parameter 'edges' implicitly has an 'any' type. */
export const ensureTeaserInterfaces = (edges): Array<TeasableInterfaceNode> => {
  if (!Array.isArray(edges) || edges.length < 1) {
    return edges;
  }

  // ensure that all required fields are present.
  return edges.map((item) => ensureTeaserInterface(item.node));
};

export const getArrowThemeByChannel = (activeMainChannel: string) =>
  activeMainChannel === MAIN_CHANNEL_STYLE ? ARROW_BUTTON_THEME_SKIN : '';

export const enrichBadgeProps = (
  color: string,
  label: string,
  type = '',
  subtypeValue = '',
  isSmall = false,
) => {
  if (
    (type === NATIVE_ADVERTISING_CONTENT_TYPE &&
      subtypeValue === ADVERTISING_TYPE_ADVERTORIAL) ||
    subtypeValue === ADVERTISING_TYPE_LONGFORM
  ) {
    return {
      color: 'grayD',
      label: ADVERTORIAL,
      isSmall,
    };
  } else {
    return {
      color,
      label,
      isSmall,
    };
  }
};

export const isIconVisible = (hasVideo: boolean, __typename: string) =>
  hasVideo ||
  __typename === IMAGE_GALLERY_CONTENT_TYPE ||
  __typename === VIDEO_CONTENT_TYPE;

// The renderBadge function is exactly the same for multiple teasers. I created this getRenderBadge function so that we don't have to duplicate to much code
export const getRenderBadge =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'styles' implicitly has an 'any' type. */


    (styles) =>
    ({
      /* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
      subtypeValue,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'badgeColor' implicitly has an 'any' type. */
      badgeColor,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'badgeLabel' implicitly has an 'any' type. */
      badgeLabel,
      /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
      __typename,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'activeMainChannel' implicitly has an 'any' type. */
      activeMainChannel,
    }): ReactElement => {
      const isAdvertorial =
        (__typename === NATIVE_ADVERTISING_CONTENT_TYPE &&
          subtypeValue === ADVERTISING_TYPE_ADVERTORIAL) ||
        subtypeValue === ADVERTISING_TYPE_LONGFORM;

      const getThemedClass = cssClassByChannel(styles, activeMainChannel);

      return (
        <div
          className={classNames(getThemedClass('Badge'), {
            [styles.BadgePositionBottom]: isAdvertorial,
          })}
        >
          <Badge
            {...enrichBadgeProps(
              badgeColor,
              badgeLabel,
              __typename,
              subtypeValue,
            )}
          />
        </div>
      );
    };

const getUrlByPublication = (publication: string) => {
  switch (publication) {
    case PUBLICATION_GM:
      return 'gaultmillau.ch';

    case PUBLICATION_HZ:
      return 'handelszeitung.ch';

    case PUBLICATION_BIL:
      return 'bilanz.ch';

    case PUBLICATION_BEOBACHTER:
      return 'beobachter.ch';
  }
};

// The renderArrow function is exactly the same for multiple teasers. I created this getRenderArrow function so that we don't have to duplicate to much code
export const getRenderArrow =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'styles' implicitly has an 'any' type. */


    (styles) =>
    (props: TeaserProps): ReactElement => {
      const { link, activeMainChannel, publication = '', preferredUri } = props;

      const linkText = link?.label || getUrlByPublication(publication);

      if (
        !linkText ||
        !activeMainChannel ||
        (preferredUri &&
          !link?.path &&
          !additionalPublications.includes(publication))
      ) {
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
        return null;
      }

      const truncatedLinkText = truncateInBetween({
        text: linkText,
      });

      const theme = getArrowThemeByChannel(activeMainChannel);

      return (
        <div
          className={classNames(styles.Badge, styles.BadgePositionBottom)}
          title={linkText}
        >
          <ArrowButton
            origin={TEASER_ARROW_BUTTON_ORIGIN}
            disableHover
            theme={theme}
            small
            addClass={classNames(styles.ArrowButtonAddClass, grid.HiddenSmUp)}
          >
            {truncatedLinkText}
          </ArrowButton>

          <ArrowButton
            origin={TEASER_ARROW_BUTTON_ORIGIN}
            disableHover
            theme={theme}
            addClass={classNames(styles.ArrowButtonAddClass, grid.HiddenSmDown)}
          >
            {truncatedLinkText}
          </ArrowButton>
        </div>
      );
    };

export const getBadgeByPropsFunction =
  (renderBadge: Function, renderArrow: Function) =>
  /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
  (props: TeaserProps): ReactElement => {
    const { __typename, badgeLabel, subtypeValue, publication } = props;

    const isAdvertorial =
      (__typename === NATIVE_ADVERTISING_CONTENT_TYPE &&
        subtypeValue === ADVERTISING_TYPE_ADVERTORIAL) ||
      subtypeValue === ADVERTISING_TYPE_LONGFORM;
    const isArrowVisible =
      __typename === TEASER_CONTENT_TYPE ||
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      additionalPublications.includes(publication) ||
      subtypeValue === ADVERTISING_TYPE_EXTERNAL;

    if (badgeLabel || isAdvertorial) {
      return renderBadge(props);
    } else if (isArrowVisible) {
      return renderArrow(props);
    }
  };

export const getIconPositionByProps = ({ __typename }: TeaserFactoryProps) =>
  __typename === VIDEO_CONTENT_TYPE;
