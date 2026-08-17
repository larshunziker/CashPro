import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import raf from 'raf';
import Link from '../../../../../../../common/components/LinkLegacy';
import SVGIcon from '../../../SVGIcon';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import { RASCH_CUSTOM_EVENT_PREFIX } from '../../../../../../../common/components/PianoProvider';
import Gift from '../Gift';
import { pianoIframeFix } from '../../../../../../shared/helpers/pianoIframeFix';
import Icon from '../../../Icon';
import {
  EVENT_UTILITY_BAR_GIFT,
  UTILITY_BAR_ORIGIN_OVERLAY,
} from '../../../../../../../shared/constants/utilitybar';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../shared/constants/content';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import styles from './styles.legacy.css';

import { UtilityGiftLinkProps } from '../../../../../../../common/components/UtilityBar/typings';

// Credits state type
export interface CreditsState {
  total: number;
  spent: number;
  redeemedItems?: Array<{
    id: string;
    exp: number;
    iat: number;
  }>;
}

// Template params type (structure inferred from usage)
export interface TemplateParams {
  affiliateState?: {
    creditStates?: CreditsState[];
  };
  containerSelector?: string;
}

const UtilityGiftLink = (
  props: UtilityGiftLinkProps,
): ReactElement<HTMLDivElement> | null => {
  const {
    item,
    isActive,
    origin,
    hideIconLabel = false,
    hasSubscriptions,
    restrictionStatus,
  } = props;
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipExists, setTooltipExists] = useState<boolean>(false);
  const [creditsLeft, setCreditsLeft] = useState<CreditsState | null>(null);

  const isTopBar = origin === UTILITY_BAR_ORIGIN_HEADER;
  const isAuthenticated = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isAuthenticated,
  );

  const handleShowTemplate = useCallback(
    (conversion: CustomEvent<TemplateParams>) => {
      const credits = conversion.detail?.affiliateState?.creditStates;
      if (credits && credits.length > 0) {
        const creditState = credits[0];
        setCreditsLeft(creditState);
        if (
          conversion.detail?.containerSelector ===
          '#piano-gift-tooltip-container'
        ) {
          setTooltipVisible(true);
          setTooltipExists(true);
        }
      }
    },
    [],
  );
  useEffect(() => {
    document.addEventListener(
      `${RASCH_CUSTOM_EVENT_PREFIX}showTemplate`,
      handleShowTemplate,
    );
    return () => {
      document.removeEventListener(
        `${RASCH_CUSTOM_EVENT_PREFIX}showTemplate`,
        handleShowTemplate,
      );
    };
  }, [handleShowTemplate]);

  const elementPosition = isTopBar
    ? 'utility bar - site header'
    : 'utility bar - article header';
  useEffect(() => {
    if (tooltipVisible) {
      raf(() => {
        pianoIframeFix('#piano-gift-tooltip-container');
      });
    }
  }, [tooltipVisible]);
  if (
    !isAuthenticated ||
    restrictionStatus !== RESTRICTION_STATUS_PAID ||
    !hasSubscriptions
  ) {
    return null;
  }

  const onEvents = {
    onClick: () => {
      const event = new CustomEvent(EVENT_UTILITY_BAR_GIFT, {
        detail: {
          elementPosition,
        },
      });
      document.dispatchEvent(event);
    },
    onMouseEnter: () => setTooltipVisible(true),
    onMouseLeave: () => setTooltipVisible(false),
    onFocus: () => setTooltipVisible(true),
    onBlur: () => setTooltipVisible(false),
  };

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

  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.TopBarWrapper]: isTopBar,
      })}
    >
      <Link
        {...onEvents}
        trackingData={trackingData}
        className={classNames('utility-button', styles.Link, {
          [styles.Active]: isActive,
          [styles.TooltipOpen]: tooltipVisible && !isTopBar,
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [item.addClass]: !!item.addClass,
          [styles.HeaderLink]: origin === UTILITY_BAR_ORIGIN_HEADER,
          [styles.Hidden]: !creditsLeft,
        })}
        aria-label={item.iconLabel}
      >
        <>
          <SVGIcon type={item.iconType} className={styles.Icon} />
          {!hideIconLabel && <p className={styles.Label}>{item.iconLabel}</p>}
        </>
      </Link>
      {!isTopBar && <Gift creditsLeft={creditsLeft} />}
      {!isTopBar && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <div
          className={classNames(styles.Tooltip, {
            [styles.Hidden]: !tooltipVisible || !tooltipExists,
          })}
          role="tooltip"
          onClick={() => setTooltipVisible(false)}
        >
          <div
            className={styles.TooltipCloseIcon}
            tabIndex={0}
            role="button"
            aria-label="Close tooltip"
            onClick={() => setTooltipVisible(false)}
            onKeyUp={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setTooltipVisible(false);
              }
            }}
          >
            <Icon type="IconXMark" />
          </div>
          <div id="piano-gift-tooltip-container"></div>
        </div>
      )}
    </div>
  );
};

export default memo(UtilityGiftLink);
