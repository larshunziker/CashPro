import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import classNames from 'classnames';
import ShareLink from '../../../../components/ShareLink';
import settingsStateSelector from '../../../../../../../shared/selectors/settingsStateSelector';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ShareItemProps, SharePanelProps } from './typings';

type SharePanelPropsInner = SharePanelProps & {
  convertUrl: (props: ShareItemProps) => string;
  language: string;
};

const ICON_TYPE_PHONE = 'IconPhone';
const ICON_TYPE_LOCATION = 'IconLocation';
const QUESTION_MARK = '%3F';
const AMPERSAND = '%26';

const shareItems = [
  {
    iconType: ICON_TYPE_LOCATION,
    iconLabel: 'Route',
    url: 'https://www.google.ch/maps/dir//[address]',
  },
  {
    iconType: ICON_TYPE_PHONE,
    iconLabel: 'Anrufen',
    iconLabelFr: 'Appeler',
    url: 'tel:[telephone]',
    addClass: grid.HiddenSmUp,
  },
];

const ShareItems = ({ convertUrl, language }: SharePanelPropsInner) =>
  shareItems.map((shareItem) => {
    const parsedUrl = convertUrl(shareItem);
    const label =
      language === 'fr' && shareItem.iconLabelFr
        ? shareItem.iconLabelFr
        : shareItem.iconLabel;
    return (
      parsedUrl && (
        <ShareLink
          iconType={shareItem.iconType}
          key={`organization-share-item-${label}`}
          url={parsedUrl}
          addClass={classNames(styles.SharePanelItem, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [shareItem.addClass]: !!shareItem.addClass,
          })}
          iconAddClass={styles.Icon}
          ariaLabel={`Link zu ${label}`}
        >
          <span className={styles.Label}>{label}</span>
        </ShareLink>
      )
    );
  });

const doConvertUrl = (url: string, additionalQueryParam = '', props: any) => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  const shareUrl: string = global.locationOrigin + props.routePathname;
  const hasQueryParam =
    shareUrl.indexOf('?') !== -1 || shareUrl.indexOf(QUESTION_MARK) !== -1;
  const paramDelimiter =
    hasQueryParam && additionalQueryParam ? AMPERSAND : QUESTION_MARK;
  const finalUrl =
    (additionalQueryParam &&
      `${shareUrl}${paramDelimiter}${additionalQueryParam}`) ||
    shareUrl;

  const parsed = url
    .replace(/\[url\]/gi, finalUrl)
    .replace(/\[field_heroimage\]/gi, encodeURIComponent(props.heroImage))
    .replace(/\[field_short_title\]/gi, encodeURIComponent(props.shareTitle))
    .replace(/\[field_lead\]/gi, encodeURIComponent(props.lead))
    .replace(
      /\[address\]/gi,
      props.address &&
        encodeURIComponent(
          `${props.title}, ${props.address}, ${props.zipCode} ${props.city}`,
        ),
    )
    .replace(/\[telephone\]/gi, encodeURIComponent(props.phone));

  return parsed.indexOf('null') !== -1 ? null : parsed;
};

const withConvertUrlHandler = withHandlers({
  convertUrl: (props: SharePanelPropsInner) => (link: ShareItemProps) =>
    doConvertUrl(link.url, link.referrer, props),
});

export const mapStateToProps = (state: Object): Object => ({
  language: settingsStateSelector(state).language,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withConvertUrlHandler,
  // @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type.
)(ShareItems);
