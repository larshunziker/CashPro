import React, { Fragment } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../../components/Icon';
import styles from './styles.legacy.css';

interface LawyersPaginationProps {
  table: {
    getState: () => {
      pagination: {
        pageIndex: number;
      };
    };
    getPageCount: () => number;
    setPageIndex: (pageIndex: number) => void;
    getCanPreviousPage: () => boolean;
    previousPage: () => void;
    getCanNextPage: () => boolean;
    nextPage: () => void;
  };
}

const LawyersPagination: React.FC<LawyersPaginationProps> = ({ table }) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const visiblePages = [];

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const handlePageClick = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };

  const renderPageLink = (pageNumber: number, isActive: boolean) => (
    <Link
      key={pageNumber}
      className={classNames(styles.PageLink, {
        [styles.ActiveItem]: isActive,
      })}
      onClick={() => handlePageClick(pageNumber - 1)}
    >
      {pageNumber}
    </Link>
  );

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(renderPageLink(i, currentPage === i));
    }
  } else if (currentPage < 4) {
    for (let i = 1; i <= Math.min(totalPages, 4); i++) {
      visiblePages.push(renderPageLink(i, currentPage === i));
    }
    if (currentPage <= totalPages - 3) {
      visiblePages.push(<span key="ellipsis">...</span>);
    }
    if (totalPages > 4) {
      visiblePages.push(renderPageLink(totalPages, currentPage === totalPages));
    }
  } else if (currentPage === totalPages) {
    visiblePages.push(renderPageLink(1, currentPage === 1));
    if (currentPage > totalPages - 3) {
      visiblePages.push(<span key="ellipsis">...</span>);
    }
    for (let i = currentPage - 2; i <= currentPage; i++) {
      visiblePages.push(renderPageLink(i, currentPage === i));
    }
  } else if (totalPages - currentPage === 1) {
    visiblePages.push(renderPageLink(1, currentPage === 1));
    if (currentPage > totalPages - 3) {
      visiblePages.push(<span key="ellipsis">...</span>);
    }
    for (let i = currentPage - 2; i <= currentPage; i++) {
      visiblePages.push(renderPageLink(i, currentPage === i));
    }
    visiblePages.push(renderPageLink(totalPages, currentPage === totalPages));
  } else {
    for (let i = currentPage - 2; i <= currentPage; i++) {
      visiblePages.push(renderPageLink(i, currentPage === i));
    }
    visiblePages.push(
      renderPageLink(currentPage + 1, currentPage === currentPage + 1),
    );

    if (currentPage <= totalPages - 3) {
      visiblePages.push(<span key="ellipsis">...</span>);
    }

    visiblePages.push(renderPageLink(totalPages, currentPage === totalPages));
  }

  const pages = visiblePages.map((page, index) => (
    <Fragment key={`page-${index}`}>{page}</Fragment>
  ));

  return (
    <div className={styles.PagerWrapper}>
      <Link
        className={classNames(styles.PrevButton, styles.PageLink, {
          [styles.Disabled]: !table.getCanPreviousPage(),
        })}
        onClick={() => table.getCanPreviousPage() && table.previousPage()}
        aria-label="Vorherige Seite"
      >
        <Icon addClass={styles.Icon} type="IconChevronLeft" />
      </Link>
      {pages}
      <Link
        className={classNames(styles.NextButton, styles.PageLink, {
          [styles.Disabled]: !table.getCanNextPage(),
        })}
        onClick={() => table.getCanNextPage() && table.nextPage()}
        aria-label="Nächste Seite"
      >
        <Icon addClass={styles.Icon} type="IconChevronRight" />
      </Link>
    </div>
  );
};

export default LawyersPagination;
