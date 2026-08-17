import React, { ReactElement } from 'react';
import classNames from 'classnames';
import longReadHeaderFactory from '../../../../../../../common/screens/LongRead/components/LongReadHeader/factory';
import { isRestrictedContent } from '../../../../../../../shared/helpers/restrictedContent';
import { renderAuthorsAndDateElement } from '../../../../components/Teaser/shared/helpers';
import Link from '../../../../../../../common/components/Link';
import Helmet from '../../../../components/Helmet';
import Logo from '../../../../components/Logo';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import { PUBLICATION_BIL } from '../../../../../../../shared/constants/publications';
import { ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import {
  LOGO_ABO_BADGE,
  LOGO_BIL,
} from '../../../../components/Logo/constants';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const renderTitleBadge = ({
  restrictionStatus,
  publication,
}: Article): ReactElement | null => {
  const isContentRestricted: boolean =
    (restrictionStatus && isRestrictedContent(restrictionStatus)) || false;
  if (publication === PUBLICATION_BIL || isContentRestricted) {
    return (
      <div className={styles.LogoWrapper}>
        <div className={grid.Container}>
          {publication === PUBLICATION_BIL && (
            <div className={styles.BilLogoWrapper}>
              <Link path="/bilanz">
                <Logo type={LOGO_BIL} isInline />
              </Link>
              {isContentRestricted && <span className={styles.Divider} />}
            </div>
          )}
          {isContentRestricted && (
            <span className={styles.HzLogoWrapper}>
              <Logo type={LOGO_ABO_BADGE} isInline />
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const renderLead = (node: Article): ReactElement => (
  <>
    <Helmet
      meta={[
        {
          name: 'robots',
          content: 'max-image-preview:large',
        },
        {
          name: 'robots',
          content: ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
        },
      ]}
    />
    <div
      className={classNames('utility-bar-wrapper', styles.UtilityBarWrapper)}
    >
      <UtilityBar enabledUtilities={UTILITYBAR_CONFIG}>
        {({ isOverlayVisible, toggleOverlayVisible }) => (
          <div className={styles.UtilityOverlayWrapper}>
            <UtilityOverlay
              overlayTitle="Article teilen"
              isOverlayVisible={isOverlayVisible}
              toggleOverlayVisible={toggleOverlayVisible}
              enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
            />
          </div>
        )}
      </UtilityBar>
    </div>

    {node && node.lead && (
      <p className={classNames(styles.ArticleLead)}>{node.lead}</p>
    )}
  </>
);

const LongReadHeader = longReadHeaderFactory({
  renderAuthorsAndDateElement,
  renderLead,
  grid,
  renderTitleBadge,
  styles: {
    ArticleLead: styles.ArticleLead,
    ArticleImage: styles.ArticleImage,
    ArticleImageCredit: styles.ArticleImageCredit,
    Caption: styles.Caption,
    CaptionWrapper: styles.CaptionWrapper,
    Figure: styles.Figure,
    OverlappingText: styles.OverlappingText,
    OverlappingTextWrapper: styles.OverlappingTextWrapper,
    TeaserWrapper: styles.TeaserWrapper,
    Title: styles.Title,
    Wrapper: styles.Wrapper,
  },
});

export default LongReadHeader;
