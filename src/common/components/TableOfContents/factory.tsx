import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { scrollToAnchorElement } from '../SmoothScroll/helpers';
import Link from '../LinkLegacy';
import { PIANO_CONTAINER_INLINED } from '../../../shared/constants/piano';
import { ANCHOR_TAG_SCROLL_TO_TOP } from '../SmoothScroll/constants';
import {
  ContentLink,
  HeadingElement,
  TableOfContentsFactoryOptions,
  TableOfContentsProps,
} from './typings';

const defaultObserverOptions = {
  rootMargin: '0px',
  threshold: [0.2, 0.8],
};

const TableOfContentsFactory = ({
  intersectionObserverOptions = defaultObserverOptions,
  scrollOffset = 100,
  styles,
}: TableOfContentsFactoryOptions) => {
  const TableOfContents = ({
    headings,
    shouldHideContent,
    shouldObserve = true,
    customScrollOffset,
  }: TableOfContentsProps) => {
    const [contentLinks, setContentLinks] = useState<ContentLink[]>([]);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | (() => string)'. */
    const [activeContentLink, setActiveContentLink] = useState<string>(null);
    const contentLinksRef = useRef<ContentLink[]>([]);
    const observer = useRef<IntersectionObserver>(null);
    const hasContent = headings?.length;
    const justScrolledFlag = useRef(false);
    const justScrolledTimeout = useRef(null);
    const offset = customScrollOffset || scrollOffset;

    useEffect(() => {
      const links = headings.reduce(
        (headingLinksList: ContentLink[], currentHeading) => {
          if (Array.isArray(currentHeading)) {
            return [
              ...headingLinksList,
              ...currentHeading.map((sectionHeader) => ({
                ...sectionHeader,
                node:
                  (!shouldHideContent &&
                    document.getElementById(sectionHeader.anchorLink)) ||
                  null,
              })),
            ];
          }
          return [
            ...headingLinksList,
            {
              ...currentHeading,
              node:
                (!shouldHideContent &&
                  document.getElementById(currentHeading.anchorLink)) ||
                null,
            },
          ];
        },
        [],
      );

      /* @ts-ignore TODO: TS2345 ->  Argument of type '(ContentLink | { node */
      setContentLinks(links);
    }, [headings, shouldHideContent]);

    const handleObserver = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'entries' implicitly has an 'any' type. */
      (entries) => {
        if (!shouldObserve) {
          return;
        }
        entries.forEach((entry: IntersectionObserverEntry) => {
          const href = entry.target.getAttribute('id');
          const link = contentLinksRef.current.find(
            (l: ContentLink) => l.anchorLink === href,
          );

          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          link.active = !!entry.isIntersecting;
          const activeLinks: ContentLink[] = contentLinksRef.current.filter(
            (l: ContentLink) => l.active,
          ); // there might be more than one paragraph fully visible at the same time
          if (activeLinks?.length && !justScrolledFlag.current) {
            // highlight only first paragraph that is visible on screen && prevent highlighting during smooth scrolling

            const firstLinkToHighlight = // as smoothscrolls for sections are used as 'wrappers', section will be active as long any paragraph inside is active
              activeLinks[0].isSectionTitle &&
              activeLinks[1] &&
              !activeLinks[1].isSectionTitle
                ? activeLinks[1]
                : activeLinks[0];

            setActiveContentLink(firstLinkToHighlight.anchorLink);
          }
        });
      },
      [setActiveContentLink, shouldObserve],
    );

    useEffect(() => {
      if (shouldHideContent) {
        return;
      }
      contentLinksRef.current = contentLinks;

      /* @ts-ignore TODO: TS2540 ->  Cannot assign to 'current' because it is a read-only property. */
      observer.current = new IntersectionObserver(
        handleObserver,
        intersectionObserverOptions,
      );
      const { current: currentObserver } = observer;

      contentLinksRef.current.forEach((l: ContentLink) => {
        if (l.node || __TESTING__) {
          currentObserver.observe(l.node);
        }
      });

      return () => currentObserver.disconnect();
    }, [contentLinks, handleObserver, shouldHideContent]);

    if (!hasContent) {
      return null;
    }

    const handleClick = (anchorLink: string, shouldHideContent: boolean) => {
      global.history.replaceState(
        {},
        '',
        `${global.location.pathname + global.location.search}#${anchorLink}`,
      );
      const path =
        (shouldHideContent &&
          anchorLink !== ANCHOR_TAG_SCROLL_TO_TOP &&
          `${PIANO_CONTAINER_INLINED}`) ||
        `${anchorLink}`;

      scrollToAnchorElement(path, { offset, replace: true });
      if (justScrolledTimeout.current) {
        clearTimeout(justScrolledTimeout.current);
      }
      justScrolledFlag.current = true;

      if (activeContentLink !== anchorLink) {
        setActiveContentLink(anchorLink);
      }

      /* @ts-ignore TODO: TS2322 ->  Type 'Timeout' is not assignable to type 'null'. */
      justScrolledTimeout.current = setTimeout(
        () => (justScrolledFlag.current = false),
        1000, // time for smooth scroll to finish scrolling
      );
    };

    return (
      <nav className={styles.Wrapper} data-testid="table-of-contents-wrapper">
        <div className={classNames(styles.Header, styles.HiddenMdUp)}>
          Inhalt
        </div>
        <ul className={styles.InnerWrapper}>
          {headings.map((headingElement: HeadingElement | HeadingElement[]) =>
            Array.isArray(headingElement) ? (
              headingElement.map((nestedHeading, index, array) => (
                <li
                  key={`${nestedHeading.anchorLink}`}
                  className={classNames(styles.SecondLevelListEl, {
                    [styles.Divider]: index === array.length - 1,
                  })}
                >
                  <Link
                    link={{
                      path:
                        (shouldHideContent && `#${PIANO_CONTAINER_INLINED}`) ||
                        `#${nestedHeading.anchorLink}`,
                    }}
                    onClick={() => {
                      handleClick(nestedHeading.anchorLink, shouldHideContent);
                    }}
                    className={classNames({
                      [styles.FirstLevelLink]: nestedHeading.isSectionTitle,
                      [styles.Link]: !nestedHeading.isSectionTitle,
                      [styles.ActiveLink]:
                        activeContentLink === nestedHeading.anchorLink,
                    })}
                  >
                    {nestedHeading.text}
                  </Link>
                </li>
              ))
            ) : (
              <li
                className={styles.Divider}
                key={`${headingElement?.anchorLink}`}
              >
                <Link
                  link={{
                    path:
                      (shouldHideContent &&
                        headingElement.anchorLink !==
                          ANCHOR_TAG_SCROLL_TO_TOP &&
                        `#${PIANO_CONTAINER_INLINED}`) ||
                      `#${headingElement.anchorLink}`,
                  }}
                  onClick={() => {
                    handleClick(headingElement.anchorLink, shouldHideContent);
                  }}
                  className={classNames(styles.FirstLevelLink, {
                    [styles.ActiveLink]:
                      activeContentLink === headingElement.anchorLink,
                  })}
                >
                  {headingElement.text}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    );
  };

  return TableOfContents;
};

export default TableOfContentsFactory;
