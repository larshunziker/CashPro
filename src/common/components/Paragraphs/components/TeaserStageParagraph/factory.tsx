/**
 * @file  Teaser Stage Paragraph factory
 */

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import shuffle from 'lodash/shuffle';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import Link from '../../../Link';
import Picture from '../../../Picture';
import { STYLE_SCALEH_120 } from '../../../../../shared/constants/images';
import {
  TEASER_STAGE_PARAGRAPH_STYLE_HEADLESS,
  TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST,
} from '../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_TEASER_STAGE_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import { SVG_ICONS_TYPE_CHEVRON_RIGHT } from '../../../../../shared/constants/svgIcons';
import {
  TeaserStageParagraphFactoryOptions,
  TeaserStageParagraphFactoryOptionsStyles,
  TeaserStageParagraphProps,
} from './typings';

const teaserStageParagraphFactory = ({
  ensureTeaserInterface,
  TeaserGridRenderer,
  SVGIcon,
  gridLayout: appGridLayout,
  styles: appStyles,
}: TeaserStageParagraphFactoryOptions<any>) => {
  const TeaserStageParagraph = (
    props: TeaserStageParagraphProps,
  ): ReactElement => {
    const { teaserStage, origin }: TeaserStageParagraphProps = props;
    const { setRef, isInView }: UseInViewResponse = useInView({
      rootMargin: '10px',
      triggerOnce: true,
    });

    const isHeadless =
      teaserStage?.style === TEASER_STAGE_PARAGRAPH_STYLE_HEADLESS;

    const [teaserStageItems, setTeaserStageItems] = useState(
      JSON.parse(JSON.stringify(teaserStage?.entities?.edges || [])),
    );
    const teaserStageItemsRef = useRef(teaserStageItems);
    useEffect(() => {
      if (
        teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST &&
        Array.isArray(teaserStageItemsRef.current) &&
        teaserStageItemsRef.current?.length > 0
      ) {
        setTeaserStageItems(shuffle(teaserStageItemsRef.current as any));
      }
    }, [teaserStage.style]);

    if (
      !teaserStageItems ||
      !Array.isArray(teaserStageItems) ||
      teaserStageItems.length === 0
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const defaultStyles: TeaserStageParagraphFactoryOptionsStyles = {
      SectionTitle: '',
      TitleLink: '',
      Container: '',
      SVGImage: '',
      TitleWrapper: '',
      SponsorWrapper: '',
      SponsorImage: '',
      SponsorPrefix: '',
      SponsorLink: '',
      Icon: '',
    };

    const styles: TeaserStageParagraphFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
    const gridLayout: string =
      (typeof appGridLayout === 'function' && appGridLayout(props)) ||
      (typeof appGridLayout === 'object' && appGridLayout) ||
      null;

    const sponsor: Sponsor | null =
      teaserStage.termReference?.sponsors?.edges?.[0]?.node || null;

    const isSponsorLogoShown: boolean =
      sponsor?.logoStandalone?.file?.relativeOriginPath &&
      teaserStage.hasSponsoring;

    const path: string =
      teaserStage.termReference?.preferredUri ||
      teaserStage.termReference?.landingPage?.preferredUri ||
      '';
    const label: string =
      teaserStage.title ||
      teaserStage.termReference?.title ||
      teaserStage.termReference?.label;

    const showLinkIcon = SVGIcon && path;

    if (isInView && isSponsorLogoShown) {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'sponsor_logo_impression',
          tealium_event: 'sponsor_logo_impression',
          event_category: 'sponsor',
          event_action: 'logo_impression',
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          event_label: sponsor.title,
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          cms_target_page_sponsor: sponsor.title,
        },
      });
    }

    //intermediate step to avoid circular dependency
    const TeaserGrid = TeaserGridRenderer();

    return (
      <div className={styles.Wrapper}>
        <div
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_TEASER_STAGE_PARAGRAPH,
            styles.Container,
          )}
        >
          <div className={styles.TitleWrapper}>
            <div
              className={classNames({
                [styles.SectionTitle]: label,
              })}
            >
              {(teaserStage?.image?.source && (
                <Link path={path} className={styles.TitleLink}>
                  <Picture
                    url={teaserStage.image.source}
                    className={classNames(
                      styles.SVGImage,
                      teaserStage?.imageFormat || '',
                    )}
                    alt={label || teaserStage.image.alt || ''}
                    disableWrapperClassName
                  />
                  {showLinkIcon && (
                    <SVGIcon
                      className={styles.Icon}
                      type={SVG_ICONS_TYPE_CHEVRON_RIGHT}
                    />
                  )}
                </Link>
              )) ||
                (label && (
                  <Link path={path} className={styles.TitleLink}>
                    {label}
                    {showLinkIcon && (
                      <>
                        {' '}
                        <SVGIcon
                          className={styles.Icon}
                          type={SVG_ICONS_TYPE_CHEVRON_RIGHT}
                        />
                      </>
                    )}
                  </Link>
                ))}
            </div>
            {isSponsorLogoShown && (
              /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
              <div className={styles.SponsorWrapper} ref={setRef}>
                <p className={styles.SponsorPrefix}>
                  {/* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */}
                  {sponsor.prefix || 'presented by'}
                </p>
                <Link
                  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                  path={sponsor.teaserImage?.link?.path || ''}
                  rel="sponsored"
                  className={styles.SponsorLink}
                  onClick={(): void => {
                    tealiumTrackEvent({
                      type: 'link',
                      payload: {
                        event_name: 'sponsor_logo_click',
                        tealium_event: 'sponsor_logo_click',
                        event_category: 'sponsor',
                        event_action: 'logo_click',
                        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                        event_label: sponsor.title,
                        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                        cms_target_page_sponsor: sponsor.title,
                      },
                    });
                  }}
                >
                  <Picture
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                    relativeOrigin={
                      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                      sponsor.logoStandalone.file.relativeOriginPath
                    }
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    focalPointX={sponsor.logoStandalone.file.focalPointX}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    focalPointY={sponsor.logoStandalone.file.focalPointY}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                    title={sponsor.title}
                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                    alt={sponsor.logoStandalone.file.alt || sponsor.title || ''}
                    className={styles.SponsorImage}
                    style_320={STYLE_SCALEH_120}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>

        <TeaserGrid
          layout={gridLayout}
          items={teaserStageItems.map(({ node }) => ({
            ...ensureTeaserInterface(node),
            isHeadless,
          }))}
          origin={origin}
        />
      </div>
    );
  };

  return TeaserStageParagraph;
};

export default teaserStageParagraphFactory;
