import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import { categories } from './constants';
import styles from './styles.legacy.css';

const SearchCategoryFilter = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'searchQuery' implicitly has an 'any' type. */
  searchQuery,
  searchCategory = 'alle',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
  data,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'categoryCountOverview' implicitly has an 'any' type. */
  categoryCountOverview,
}) => {
  const { textSearch, textSearchAll } = data;
  let allCounter = 0;
  let categoryData = textSearch;

  if (searchCategory !== 'alle') {
    categoryData = textSearchAll;
  }

  const newsCounter = categoryCountOverview?.newsCount;
  const wikifolioCounter = categoryCountOverview?.wikifolioCount;
  const newEmissionCounter = categoryCountOverview?.newEmissionCount;
  const hasSwissDotsResults =
    textSearch?.derivative?.items?.map(
      (item: any) => item.market === 'SwissDots',
    ).length > 0;

  categories.forEach((category) => {
    if (searchCategory !== 'alle' && textSearchAll?.[category.id]?.count) {
      allCounter = parseInt(textSearchAll?.[category.id]?.count) + allCounter;
    } else if (textSearch?.[category.id]?.count) {
      if (category.id === 'newEmission') {
        if (!hasSwissDotsResults) {
          allCounter = parseInt(textSearch?.[category.id]?.count) + allCounter;
        }
      } else {
        allCounter = parseInt(textSearch?.[category.id]?.count) + allCounter;
      }
    }
  });

  if (newsCounter) {
    allCounter = parseInt(newsCounter) + allCounter;
  }

  if (wikifolioCounter) {
    allCounter = parseInt(wikifolioCounter) + allCounter;
  }

  if (newEmissionCounter) {
    allCounter = parseInt(newEmissionCounter) + allCounter;
  }

  return (
    <div className={styles.CategoryWrapper}>
      {categories.map((category, index) => {
        let counter = categoryData?.[category.id]?.count;
        if (category.id === 'news') {
          counter = newsCounter;
        }
        if (category.id === 'wikifolio') {
          counter = wikifolioCounter;
        }

        if (category.id === 'newEmission') {
          counter = newEmissionCounter;
        }

        if (category.id !== 'all' && !counter) {
          return null;
        }

        if (category.id === 'all') {
          counter = allCounter;
        }

        return (
          <Link
            key={`category-item-${category.id}-${index}`}
            path={`${category?.link}${encodeURIComponent(searchQuery)}`}
            className={classNames(styles.Button, {
              [styles.isActive]: category.slugName === searchCategory,
            })}
          >
            <>
              {category.name} ({counter.toLocaleString('de-CH') || 0})
            </>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchCategoryFilter;
