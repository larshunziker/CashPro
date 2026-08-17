import appNexusStyles from '../../components/AppNexus/styles.legacy.css';
import utilityBarStyles from '../../components/UtilityBar/components/UtilityHeaderBar/styles.legacy.css';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.Container,
  styles.Children,
  styles.Ad,
  styles.Sticky,
  styles.UtilityBarPresent,
  styles.MiniWidgetsPresent,
  utilityBarStyles.UtilityBarWrapper,
  utilityBarStyles.UtilityOverlayWrapper,
  utilityBarStyles.Title,
  utilityBarStyles.TitleWrapper,
  utilityBarStyles.ContentWrapper,
  appNexusStyles.AdSlot,
  appNexusStyles.details_ad1,
  appNexusStyles.details_ad3,
  appNexusStyles.top_ad1,
  appNexusStyles.bottom_ad1,
  appNexusStyles.right_ad1,
  appNexusStyles.index_ad1,
  appNexusStyles.MMR1Placeholder,
];

const utilityBarHeight = 54;

let pendingRafId: number | null = null;
let mainObserver: MutationObserver | null = null;
let utilityBarObserver: MutationObserver | null = null;
let lastAppliedTop = '';
let lastAppliedHeight = '';

const getElement = (selector: string, isClass = false) =>
  (isClass
    ? document.getElementsByClassName(selector)?.[0]
    : document.getElementById(selector)) as HTMLElement;

const getHeight = (el: HTMLElement) => el?.getBoundingClientRect().height || 0;

const checkVisibility = (el: HTMLElement) =>
  el?.classList?.contains(utilityBarStyles.MoveUp) || false;

const applyStyles = () => {
  const mainEl = document.querySelector('main#main') as HTMLElement;
  const monsterSkyEl = getElement(styles.AdWrapper, true);
  const utilityBarEl = getElement(utilityBarStyles.Wrapper, true);
  const topAd = getElement(appNexusStyles.top_ad1, true);
  const bottomAd = getElement(appNexusStyles.bottom_ad1, true);

  if (!mainEl || !monsterSkyEl) return;

  const isUtilityBarVisible = checkVisibility(utilityBarEl);

  //@TODO: this is not working as expected. I guess the idea was to move the the element down depending on
  // if the sUtilityBar is visible or not. This needs further investigation to make it work properly
  const newTop = `${isUtilityBarVisible ? 54 : 0}px`;
  let finalHeight = getHeight(mainEl) + getHeight(topAd) + getHeight(bottomAd);

  if (isUtilityBarVisible) {
    finalHeight -= utilityBarHeight;
  }

  const newHeight = `${finalHeight}px`;

  if (newTop !== lastAppliedTop) {
    monsterSkyEl.style.top = newTop;
    lastAppliedTop = newTop;
  }
  if (newHeight !== lastAppliedHeight) {
    monsterSkyEl.style.height = newHeight;
    lastAppliedHeight = newHeight;
  }
};

const scheduleRecalculation = () => {
  if (pendingRafId !== null) return;
  pendingRafId = requestAnimationFrame(() => {
    pendingRafId = null;
    applyStyles();
  });
};

export const recalculateMainContainerMinHeight = () => {
  const mainEl = document.querySelector('main#main') as HTMLElement;
  const headerEl = getElement('site-header', true);
  const monsterSkyEl = getElement(styles.AdWrapper, true);
  const footerEl = getElement('footer');
  const utilityBarEl = getElement(utilityBarStyles.Wrapper, true);

  if (!mainEl || !headerEl || !monsterSkyEl || !footerEl) {
    return;
  }

  applyStyles();

  if (mainObserver) {
    mainObserver.disconnect();
  } else {
    mainObserver = new MutationObserver(() => {
      scheduleRecalculation();
    });
  }

  mainObserver.observe(mainEl, {
    childList: true,
    subtree: true,
  });

  if (utilityBarEl) {
    if (utilityBarObserver) {
      utilityBarObserver.disconnect();
    } else {
      utilityBarObserver = new MutationObserver(() => {
        scheduleRecalculation();
      });
    }

    utilityBarObserver.observe(utilityBarEl, {
      childList: true,
      subtree: true,
    });
  }
};
