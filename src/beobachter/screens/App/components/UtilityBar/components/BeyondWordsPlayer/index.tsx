import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore */
import BeyondWords from '@beyondwords/player';
import classNames from 'classnames';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';

interface BeyondWordsProps {
  articleId: string;
  restrictionStatus?: string | null;
}

const BeyondWordsPlayer = ({
  articleId,
  restrictionStatus,
}: BeyondWordsProps) => {
  const [playerInstance, setPlayerInstance] = useState<BeyondWords | null>(
    null,
  );
  const playerRef = useRef(null);
  const [isFallbackShown, setIsFallbackShown] = useState(true);
  const hasSubscriptions = useSelector(
    (state: Record<string, any>) =>
      authStateSelector(state).hasSubscriptions ||
      pianoStateSelector(state).isAccessGranted,
  );
  const initialAuthRequest = useSelector(
    (state: Record<string, any>) => authStateSelector(state).initialAuthRequest,
  );
  const restrictedContent = restrictionStatus === RESTRICTION_STATUS_PAID;

  useEffect(() => {
    if (
      playerRef &&
      !playerInstance &&
      (!restrictedContent || initialAuthRequest)
    ) {
      const sourceId =
        (restrictedContent && !hasSubscriptions && 'no-access-to-beo') ||
        articleId;

      const player = new BeyondWords.Player({
        target: playerRef.current,
        projectId: __DOT_ENV__ === 'master' ? '49614' : '43777',
        sourceId: sourceId,
        playerStyle: 'standard',
        callToAction: 'Jetzt anhören',
        backgroundColor: '#ab0000',
        iconColor: '#FFFFFF',
        textColor: '#FFFFFF',
        showBottomWidget: false,
        widgetStyle: 'none',
        playbackRates: [0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
      });
      player.addEventListener('ContentAvailable', (event: any) => {
        if (event?.status === 'handled') {
          setIsFallbackShown(false);
        }
      });
      setPlayerInstance(player);
    }
  }, [
    playerRef,
    playerInstance,
    articleId,
    restrictedContent,
    initialAuthRequest,
    hasSubscriptions,
  ]);

  return (
    <>
      <div
        id="beyondwords-player"
        key={`utility-bar-beyondwords`}
        ref={playerRef}
      ></div>
      <div
        className={classNames(styles.NoTranslationContainer, {
          [styles.Hidden]: !isFallbackShown,
        })}
      >
        Vorlesenfunktion nicht verfügbar
      </div>
    </>
  );
};

export default BeyondWordsPlayer;
