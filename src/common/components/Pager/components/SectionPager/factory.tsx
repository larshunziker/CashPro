import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import Link from '../../../Link';
import { SECTION_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import { SectionPagerFactoryOptions, SectionPagerProps } from './typings';

type SectionPagerPropsInner = SectionPagerProps & {
  routeQuery: LocationBeforeTransitions['query'];
  routePathname: string;
};

const SectionPagerFactory = ({
  styles,
  messages = {
    title: 'Inhalt',
    chapter: 'Kapitel',
  },
}: SectionPagerFactoryOptions) => {
  class SectionPager extends Component<SectionPagerPropsInner> {
    constructor(props: SectionPagerPropsInner) {
      super(props);
    }

    getHref = (
      index: number,
      routePathname: string,
      routeQuery: LocationBeforeTransitions['query'],
    ) => {
      if (
        Number.isNaN(this.props.currentIndex) ||
        !routePathname ||
        !routeQuery
      ) {
        return null;
      }
      const anchorScrollId =
        (this.props.anchorScrollId && `#${this.props.anchorScrollId}`) || '';

      // the first item in the index does not need a query param
      if (!index) {
        return `${routePathname}${anchorScrollId}`;
      }

      const searchQuery = {
        ...routeQuery,
        ['page']: index + 1,
      };

      const search = Object.keys(searchQuery)
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ page */
        .map((value) => `${value}=${searchQuery[value]}`)
        .join('&');

      return `${routePathname}${
        (search && '?' + search) || ''
      }${anchorScrollId}`;
    };

    render(): ReactElement {
      const { sectionParagraphs, isRight, routePathname, routeQuery } =
        this.props;
      /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return (
        sectionParagraphs &&
        Array.isArray(sectionParagraphs) &&
        sectionParagraphs.length > 0 && (
          <div
            className={classNames(styles.Wrapper, {
              [styles.WrapperRight]: isRight,
            })}
          >
            <div className={styles.Title}>{messages.title}</div>
            <ul>
              {sectionParagraphs.map(
                (section: SectionParagraph, index: number): ReactElement => {
                  if (section.__typename !== SECTION_PARAGRAPH) {
                    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
                    return null;
                  }

                  // minus one at the end for proper pagination (first page has no ?page=0, second page starts with ?page=2)
                  const currentIndex =
                    (this.props.currentIndex &&
                      !Number.isNaN(this.props.currentIndex) &&
                      this.props.currentIndex - 1) ||
                    0;

                  // a fallback title in case the section has none
                  const linkText: string =
                    section?.title || `Seite ${index + 1}`;

                  return (
                    <li
                      key={`section-pager-item-${index}`}
                      className={styles.SectionPagerItem}
                    >
                      <Link
                        path={
                          this.getHref(index, routePathname, routeQuery) || ''
                        }
                        className={classNames(
                          'section-pager-btn',
                          styles.Link,
                          {
                            [styles.LinkIsActive]: currentIndex === index,
                          },
                        )}
                      >
                        <div
                          className={classNames(styles.ItemWrapper, {
                            [styles.ItemWrapperIsActive]:
                              currentIndex === index,
                          })}
                        >
                          <span
                            className={classNames({
                              [styles.ItemTitle]: currentIndex !== index,
                              [styles.ItemTitleIsActive]:
                                currentIndex === index,
                            })}
                          >
                            {`${messages.chapter} ${index + 1}`}
                          </span>
                          <strong
                            className={classNames({
                              [styles.ItemText]: currentIndex !== index,
                              [styles.ItemTextIsActive]: currentIndex === index,
                            })}
                          >
                            {linkText}
                          </strong>
                        </div>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        )
      );
    }
  }

  const mapStateToProps = (state: ReduxState) => ({
    routeQuery: locationStateSelector(state).locationBeforeTransitions.query,
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
  });

  const withStoreConnection = connect(mapStateToProps);

  return compose<any, any>(withStoreConnection)(SectionPager);
};

export default SectionPagerFactory;
