import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { scrollToAnchorElement } from '../../../../../../../common/components/SmoothScroll/helpers';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import { PagerProps } from './typings';

type PageLoaderPropsInner = PagerProps & {
  handleClick: (pageNumber: number) => void;
  handleSmoothScroll: () => void;
  totalPages?: number;
};

type ButtonProps = PageLoaderPropsInner & {
  elementKey?: string;
  label: string;
};

const VISIBLE_BEFORE_CURRENT = 3;

// calculate the range of pages to show by "currentpage minus VISIBLE_BEFORE_CURRENT pages"
// (VISIBLE_BEFORE_CURRENT being the visible range + 1 page over)
const getCurrentPage = (currentPage: number, count: number) =>
  currentPage > VISIBLE_BEFORE_CURRENT
    ? currentPage + (count + 1 - VISIBLE_BEFORE_CURRENT)
    : count + 1;

const ButtonPrevious = ({
  currentPage,
  handleClick,
  handleSmoothScroll,
}: PageLoaderPropsInner) => {
  const hasPreviousPage = currentPage > 1;

  return (
    <Link
      onClick={(event) => {
        event.preventDefault();
        handleClick(currentPage - 1);
        handleSmoothScroll();
      }}
      className={classNames(
        'page-loader-prev-btn',
        styles.PageLink,
        styles.PrevButton,
        {
          [styles.Disabled]: !hasPreviousPage,
        },
      )}
      aria-label="vorherige Seite"
    >
      <Icon addClass={styles.Icon} type="IconChevronLeft" />
    </Link>
  );
};

const ButtonNext = ({
  currentPage,
  handleClick,
  handleSmoothScroll,
  totalPages,
}: PageLoaderPropsInner): ReactElement => {
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const hasNextPage = currentPage < totalPages;

  return (
    <Link
      onClick={(event) => {
        event.preventDefault();
        handleClick(currentPage + 1);
        handleSmoothScroll();
      }}
      className={classNames(
        'page-loader-next-btn',
        styles.PageLink,
        styles.NextButton,
        {
          [styles.Disabled]: !hasNextPage,
        },
      )}
      aria-label="nächste Seite"
    >
      <Icon addClass={styles.Icon} type="IconChevronRight" />
    </Link>
  );
};

const Button = ({
  elementKey,
  label,
  handleClick,
  handleSmoothScroll,
  currentPage,
}: ButtonProps) => {
  const index =
    (!Number.isNaN(parseInt(label, 10)) && parseInt(label, 10)) || 0;

  return (
    <Link
      key={`page-loader-button-${elementKey || label}`}
      onClick={(event) => {
        event.preventDefault();
        handleClick(index);
        handleSmoothScroll();
      }}
      className={classNames('page-loader-btn', styles.PageLink, {
        [styles.ActiveItem]: currentPage === index,
        [styles.Disabled]: label === '...',
      })}
      label={label}
    />
  );
};

class PageLoaderMemory extends Component<PageLoaderPropsInner> {
  constructor(props: PageLoaderPropsInner) {
    super(props);
  }

  smoothScrollToAnchor = (): void => {
    if (this.props.anchorScrollId) {
      scrollToAnchorElement(this.props.anchorScrollId, {
        behavior: 'smooth',
      });
    }
  };

  render() {
    const totalPages = Math.ceil(
      this.props.itemsCount / this.props.itemsPerPage,
    );
    const pagesNumber = Math.min(totalPages, VISIBLE_BEFORE_CURRENT);

    const pageAfterCurrent =
      this.props.currentPage >= VISIBLE_BEFORE_CURRENT + 1
        ? this.props.currentPage + 1
        : VISIBLE_BEFORE_CURRENT + 1;

    return (
      <div className={styles.Wrapper}>
        {
          <ButtonPrevious
            {...this.props}
            handleSmoothScroll={this.smoothScrollToAnchor}
          />
        }

        {/* FIRST PAGE button */}
        {this.props.currentPage > totalPages - 2 &&
          totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
            <Button
              {...this.props}
              label="1"
              elementKey="firstPageShortcut"
              handleSmoothScroll={this.smoothScrollToAnchor}
            />
          )}

        {/* FILLER (...) only visible at the end*/}
        {this.props.currentPage > totalPages - 2 &&
          totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
            <Button
              {...this.props}
              label="..."
              elementKey="filler"
              handleSmoothScroll={this.smoothScrollToAnchor}
            />
          )}

        {/* RENDER VISIBLE PAGES */}
        {[...Array(pagesNumber)].map((_item, index) => (
          <Button
            {...this.props}
            elementKey={index.toString()}
            label={getCurrentPage(this.props.currentPage, index).toString()}
            key={`pager-button-${index}`}
            handleSmoothScroll={this.smoothScrollToAnchor}
          />
        ))}

        {/* 1 PAGE AFTER CURRENT to have the next page always visible */}
        {this.props.currentPage + 1 <= totalPages &&
          totalPages > VISIBLE_BEFORE_CURRENT && (
            <Button
              {...this.props}
              elementKey={pageAfterCurrent.toString()}
              label={pageAfterCurrent.toString()}
              handleSmoothScroll={this.smoothScrollToAnchor}
            />
          )}
        {/* FILLER (...) visible until end-item - 2 */}
        {this.props.currentPage < totalPages - 2 &&
          totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
            <Button
              {...this.props}
              elementKey="secondFiller"
              label="..."
              handleSmoothScroll={this.smoothScrollToAnchor}
            />
          )}
        {/* LAST PAGE button */}
        {this.props.currentPage < totalPages - 1 &&
          totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
            <Button
              {...this.props}
              elementKey="lastPageShortcut"
              label={totalPages.toString()}
              handleSmoothScroll={this.smoothScrollToAnchor}
            />
          )}

        {/* NEXT Arrow */}
        {
          <ButtonNext
            {...this.props}
            handleSmoothScroll={this.smoothScrollToAnchor}
            totalPages={totalPages}
          />
        }
      </div>
    );
  }
}

export default PageLoaderMemory;
