import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Link from '../../../LinkLegacy';
import {
  UTILITY_BAR_ORIGIN_OVERLAY,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_TYPE_CALCULATOR,
  UTILITY_TYPE_COMMENTS,
  UTILITY_TYPE_CONTACT,
  UTILITY_TYPE_DOWNLOAD,
  UTILITY_TYPE_INFO,
  UTILITY_TYPE_PRINT,
} from '../../../../../shared/constants/utilitybar';
import {
  UtilityLinkFactoryOptions,
  UtilityLinkFactoryOptionsStyles,
  UtilityLinkProps,
} from './typings';

const defaultStyles: UtilityLinkFactoryOptionsStyles = {
  Link: '',
  Icon: '',
  Active: '',
};

const UtilityLinkFactory = ({
  SVGIcon,
  styles: appStyles,
  appAriaLabel = 'Link zu',
}: UtilityLinkFactoryOptions) => {
  const UtilityLink = (props: UtilityLinkProps): ReactElement<any> | null => {
    const {
      item,
      url,
      commentCount,
      isActive,
      origin,
      isRestricted,
      toastService,
      hideIconLabel = false,
      createDate,
    } = props;

    if (!item?.iconType) {
      return null;
    }
    let onClick: { onClick: (event: MouseEvent) => void } | undefined;

    let path: Record<string, string> | null = null;
    const styles: UtilityLinkFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const restricted =
      isRestricted &&
      [
        UTILITY_TYPE_PRINT,
        UTILITY_TYPE_COMMENTS,
        UTILITY_TYPE_BOOKMARKS,
        UTILITY_TYPE_CONTACT,
        UTILITY_TYPE_CALCULATOR,
        UTILITY_TYPE_DOWNLOAD,
        UTILITY_TYPE_INFO,
      ].includes(item.id);

    if (item?.onClick) {
      onClick = {
        onClick: item.onClick,
      };
    }

    if (item?.url && !onClick) {
      path = {
        path: url,
      };
    }

    if (restricted && toastService) {
      path = null;
      onClick = {
        onClick: (event: MouseEvent) => {
          event.preventDefault();
          toastService.displaySubscriptionOnlyInfoToast();
        },
      };
    }

    const trackingData = [
      {
        type: 'data-utility-button-type',
        value:
          (origin === UTILITY_BAR_ORIGIN_OVERLAY && 'share') || 'utility bar',
      },
      {
        type: 'data-utility-button-target',
        value: item.iconLabel,
      },
    ];

    const isViafouraEnabled = (() => {
      const viafouraDate = __VIAFOURA_DATE__ && new Date(__VIAFOURA_DATE__);
      if (typeof __VIAFOURA_DATE__ !== 'undefined') {
        const viafourPublicationDate = createDate ? new Date(createDate) : null;

        return viafourPublicationDate && viafourPublicationDate > viafouraDate;
      }
      return false;
    })();

    return (
      <TestFragment data-testid="utility-link-wrapper">
        <Link
          target={item.targetType || '_self'}
          {...onClick}
          /* @ts-ignore TODO: TS2322 ->  Type 'Record<string, string> | null' is not assignable to type 'LinkType | MenuLink | undefined'. */
          link={path}
          trackingData={trackingData}
          className={classNames('utility-button', styles.Link, {
            [styles.Active]: isActive,
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.Restricted]: restricted,
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [item.addClass]: !!item.addClass,
          })}
          aria-label={`${appAriaLabel} ${item.iconLabel}`}
        >
          <>
            <SVGIcon type={item.iconType} className={styles.Icon} />
            {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
            {!isViafouraEnabled && commentCount > 0 && (
              <span
                key={`comment-count-${commentCount}`}
                className={classNames(styles.Badge, {
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.Restricted]: restricted,
                })}
                data-testid="utility-link-comment-count-wrapper"
              >
                <span className={styles.CommentCount}>{commentCount}</span>
              </span>
            )}

            {isViafouraEnabled && item.id === UTILITY_TYPE_COMMENTS && (
              <div
                className={classNames(styles.Badge, {
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.Restricted]: restricted,
                })}
                data-testid="utility-link-comment-count-wrapper"
              >
                <vf-conversations-count />
              </div>
            )}

            {!hideIconLabel && <p className={styles.Label}>{item.iconLabel}</p>}
          </>
        </Link>
      </TestFragment>
    );
  };

  return memo(UtilityLink);
};

export default UtilityLinkFactory;
