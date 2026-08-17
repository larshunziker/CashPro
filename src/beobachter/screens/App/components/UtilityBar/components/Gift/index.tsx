import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import ButtonWithLoading from '../../../ButtonWithLoading';
import Img from '../../../Img';
import { RASCH_CUSTOM_EVENT_PREFIX } from '../../../../../../../common/components/PianoProvider';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { CreditsState } from '../UtilityGiftLink';
import { pianoIframeFix } from '../../../../../../shared/helpers/pianoIframeFix';
import Icon from '../../../Icon';
import { DEFAULT_PUBLICATION } from '../../../../constants';
import {
  EVENT_UTILITY_BAR_GIFT,
  UTILITY_BAR_GIFT,
} from '../../../../../../../shared/constants/utilitybar';
import styles from './styles.legacy.css';
import shareUrlIcon from 'graphics/share_url.svg';

// --- Types and Enums ---

// Enum for dialog state
enum GiftDialogState {
  Initial = 'initial',
  Loading = 'loading',
  Created = 'created',
  Error = 'error',
}

// API response for share URL and gift creation
interface GiftApiResponse {
  id: string;
  path: string;
  expires: number;
}

// --- API Functions ---
async function getShareUrl(path: string): Promise<GiftApiResponse | null> {
  const url = new URL(
    `${getServiceUrl(
      __COMMERCE_SERVICE_ENDPOINT__,
    )}/gifts/${DEFAULT_PUBLICATION}/get`,
  );
  url.searchParams.set('path', path);
  const getShareUrlResponse = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (getShareUrlResponse.ok) {
    return await getShareUrlResponse.json();
  }
  if (getShareUrlResponse.status === 404) {
    return null;
  }
  throw new Error(getShareUrlResponse.statusText);
}
async function createGift(path: string): Promise<GiftApiResponse> {
  const url = new URL(
    `${getServiceUrl(
      __COMMERCE_SERVICE_ENDPOINT__,
    )}/gifts/${DEFAULT_PUBLICATION}/generate`,
  );
  const createGiftResponse = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ path }),
  });
  if (!createGiftResponse.ok) {
    throw new Error('Gift creation failed');
  }
  return await createGiftResponse.json();
}

function prepareShareUrlLink(id: string) {
  return (
    window.location.origin.replace('/app.beobachter', '/www.beobachter') +
    `/r/${id}`
  );
}

export default function Gift({
  creditsLeft,
}: {
  creditsLeft: CreditsState | null;
}) {
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const [creditUsed, setCreditUsed] = useState<number>(0);
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isAuthenticated,
  );
  const [sharePathData, setSharePathData] = useState<GiftApiResponse | null>(
    null,
  );
  const [elementPosition, setElementPosition] = useState<string | null>(null);
  const [giftState, setGiftState] = useState<GiftDialogState>(
    GiftDialogState.Initial,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const calcQuota = useCallback(
    (creditUsed: number) => {
      if (creditsLeft) {
        return {
          gift_article_quota_remaining:
            creditsLeft.total - creditsLeft.spent - creditUsed,
          gift_article_quota_reached:
            creditsLeft.total - creditsLeft.spent - creditUsed <= 0,
          gift_article_quota_limit: creditsLeft.total,
        };
      }
    },
    [creditsLeft],
  );
  // client only functionality
  const handleCreateGift = useCallback(async () => {
    setGiftState(GiftDialogState.Loading);
    try {
      const data = await createGift(location.pathname);
      if (data && data.id) {
        setSharePathData(data);
        setGiftState(GiftDialogState.Created);
        const shareUrl = prepareShareUrlLink(data.id);
        setCreditUsed(1);
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'element_click',
            element_name: UTILITY_BAR_GIFT,
            element_action: 'generate_link',
            element_position: elementPosition,
            gift_id: data.id,
            gift_url: shareUrl,
            ...calcQuota(1),
          },
        });
      }
    } catch (error) {
      setGiftState(GiftDialogState.Error);
    }
  }, [location.pathname, elementPosition, calcQuota]);

  useEffect(() => {
    if (
      isAuthenticated &&
      creditsLeft?.redeemedItems?.some(
        (value) => value.id === location.pathname,
      )
    ) {
      setGiftState(GiftDialogState.Loading);
      getShareUrl(location.pathname)
        .then((data) => {
          if (data && data.id) {
            setSharePathData(data);
            setGiftState(GiftDialogState.Created);
          } else {
            setGiftState(GiftDialogState.Initial);
          }
        })
        .catch(() => {
          setGiftState(GiftDialogState.Error);
        });
    } else {
      setGiftState(GiftDialogState.Initial);
      setSharePathData(null);
    }
  }, [location.pathname, isAuthenticated, creditsLeft]);

  let shareUrl = '';
  if (sharePathData && sharePathData.id) {
    shareUrl = prepareShareUrlLink(sharePathData.id);
  }

  useEffect(() => {
    document.addEventListener(
      `${RASCH_CUSTOM_EVENT_PREFIX}manualCreditRedeemed`,
      handleCreateGift,
    );

    return () => {
      document.removeEventListener(
        `${RASCH_CUSTOM_EVENT_PREFIX}manualCreditRedeemed`,
        handleCreateGift,
      );
    };
  }, [handleCreateGift]);

  const handleGiftVisibility = useCallback(
    (event: CustomEvent<{ elementPosition: string }>) => {
      dialogRef.current?.showModal();
      setUrlCopied(false);
      setElementPosition(event.detail.elementPosition || null);
      const elementPosition = event.detail.elementPosition || null;
      pianoIframeFix('#piano-gift-container');
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'element_click',
          element_name: UTILITY_BAR_GIFT, // should be the same as the value of "data-utility-button-target"
          element_action: 'click_feature_button',
          element_position: elementPosition,
          ...calcQuota(creditUsed),
        },
      });
    },
    [calcQuota, creditUsed],
  );

  useEffect(() => {
    document.addEventListener(EVENT_UTILITY_BAR_GIFT, handleGiftVisibility);
    return () => {
      document.removeEventListener(
        EVENT_UTILITY_BAR_GIFT,
        handleGiftVisibility,
      );
    };
  }, [handleGiftVisibility]);

  const handleCopyLink = useCallback(
    (manually?: boolean) => {
      if (shareUrl) {
        let action = 'copy_link_via_button';
        if (!manually) {
          navigator.clipboard.writeText(shareUrl);
          setUrlCopied(true);
        } else {
          action = 'copy_link_manually';
        }
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'element_click',
            element_name: UTILITY_BAR_GIFT,
            element_action: action,
            element_position: elementPosition,
            ...calcQuota(creditUsed),
            gift_id: sharePathData?.id,
            gift_url: shareUrl,
          },
        });
      }
    },
    [shareUrl, elementPosition, calcQuota, creditUsed, sharePathData?.id],
  );
  const isCreditAvailable =
    creditsLeft && creditsLeft.total - creditsLeft.spent > 0;

  return (
    <dialog ref={dialogRef} className={styles.Dialog}>
      <div className={styles.GiftContainer}>
        <div className={styles.Title}>
          <Img url={shareUrlIcon} addClass={styles.Icon} alt="Geschenk" />
          <div>Artikel verschenken</div>
          <div
            className={styles.DialogCloseButton}
            onClick={() => {
              dialogRef.current?.close();
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                dialogRef.current?.close();
              }
            }}
            tabIndex={0}
            role="button"
          >
            <Icon type="IconXMark" />
          </div>
        </div>
        {shareUrl && (
          <>
            <div
              className={classNames({
                [styles.Hidden]: urlCopied,
              })}
            >
              Ihr Geschenk-Link wurde erstellt. Teilen Sie ihn mit Freunden oder
              Familie.
            </div>
            <div
              className={classNames(styles.ShareUrlContainer, {
                [styles.Hidden]: urlCopied,
              })}
            >
              Geschenk-Link
              <textarea
                className={styles.ShareUrlInput}
                readOnly
                value={shareUrl.trim()}
                rows={2}
                onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  e.currentTarget.select();
                }}
                onClick={(e: React.MouseEvent<HTMLTextAreaElement>) => {
                  e.currentTarget.select();
                }}
                onCopy={() => {
                  handleCopyLink(true);
                }}
              />
            </div>
            <>
              {urlCopied && (
                <div
                  className={classNames(styles.GreenBox, styles.CenterOnScreen)}
                >
                  Der Link wurde kopiert. Jetzt teilen und diesen Artikel
                  verschenken.
                </div>
              )}
              <ButtonWithLoading
                addClass={styles.Button}
                onClick={() => handleCopyLink(false)}
                variant="primary"
                ariaLabel="Kopieren"
                type="button"
                tabIndex={0}
                highAttention={true}
              >
                Kopieren
              </ButtonWithLoading>
            </>
          </>
        )}
        {giftState === GiftDialogState.Loading && (
          <>
            <div className={styles.LoadingState}>Link wird generiert...</div>
            <ButtonWithLoading
              addClass={styles.Button}
              variant="primary"
              type="button"
              tabIndex={-1}
              highAttention={true}
              loading={true}
            ></ButtonWithLoading>
          </>
        )}
        {giftState === GiftDialogState.Error && (
          <>
            <div className={styles.ErrorState}>
              Link konnte nicht generiert werden.
            </div>
            <div className={styles.ErrorDescription}>
              <b>Was ist passiert?</b>
              <br />
              Aufgrund eines technischen Fehlers konnte der Geschenk-Link nicht
              erstellt werden. Bitte laden Sie die Seite neu oder versuchen Sie
              es später noch einmal.
            </div>
            <ButtonWithLoading
              addClass={styles.Button}
              onClick={handleCreateGift}
              variant="primary"
              ariaLabel="Erneut versuchen"
              type="button"
              tabIndex={0}
              highAttention={true}
            >
              Erneut versuchen
            </ButtonWithLoading>
          </>
        )}
        <div
          className={classNames(styles.GiftBody, {
            [styles.Hidden]: giftState !== GiftDialogState.Initial,
          })}
        >
          <div>
            Teilen Sie diesen Be+-Artikel kostenlos mit Freunden und Familie.
          </div>
          {creditsLeft && (
            <div className={styles.GreenBox}>
              Sie können noch{' '}
              <b>
                {creditsLeft.total - creditsLeft.spent} von {creditsLeft.total}
              </b>{' '}
              Artikeln verschenken. Jeden Monat stehen Ihnen 4 neue zur
              Verfügung.
            </div>
          )}
          <div>
            <div className={styles.DescriptionTitle}>Wie funktioniert es?</div>
            <ul>
              <li>Jeder mit dem Link kann den Artikel gratis lesen.</li>
              <li>Der Link funktioniert 30 Tage lang.</li>
              <li>Für den Empfänger ist kein Abo nötig.</li>
            </ul>
          </div>
          {!isCreditAvailable && (
            <ButtonWithLoading
              addClass={styles.Button}
              onClick={() => {
                dialogRef.current?.close();
              }}
              variant="primary"
              ariaLabel="Schliessen"
              type="button"
              tabIndex={0}
              highAttention={true}
            >
              Schliessen
            </ButtonWithLoading>
          )}
          <div
            className={classNames({ [styles.Hidden]: !isCreditAvailable })}
            id="piano-gift-container"
          />
        </div>
      </div>
    </dialog>
  );
}
