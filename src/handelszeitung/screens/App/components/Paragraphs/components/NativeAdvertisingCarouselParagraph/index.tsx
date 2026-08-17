/* istanbul ignore file */

import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import NativeAdvertisingCarouselParagraphFactory from '../../../../../../../common/components/Paragraphs/components/NativeAdvertisingCarouselParagraph/factory2';
import DotsIndicator from '../../../ImageGallery/components/DotsIndicator';
import Teaser from '../../../Teaser';
import { TEASER_LAYOUT_HERO } from '../../../../../../../shared/constants/teaser';
import {
  TRACKING_CLASS_NATIVE_ADVERTISING_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';

export default NativeAdvertisingCarouselParagraphFactory({
  Teaser,
  DotsIndicator,
  teaserLayout: TEASER_LAYOUT_HERO,
  trackingClassNAParagraph: TRACKING_CLASS_NATIVE_ADVERTISING_PARAGRAPH,
  trackingClass: TRACKING_CLASS_PARAGRAPH,
  ensureTeaserInterface,
  tealiumTrackEvent,
  styles: {
    Wrapper: styles.Wrapper,
    Slide: styles.Slide,
  },
});
