import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelectDropdown from '../../../../components/MultiSelectDropdown';
import multiSelectDropdownItemFactory from '../../../../../../../common/components/MultiSelectDropdown/components/MultiSelectDropdownItem/factory';
import styles from './styles.legacy.css';
import { LegalAdviceArticleTypesProps } from './typings';
import { MultiSelectDropdownOptions } from '../../../../../../../common/components/MultiSelectDropdown/typings';

const ITEM_KEY = 'legal-advice-article-type';

const MultiSelectDropdownItem = multiSelectDropdownItemFactory();

const LegalAdviceArticleTypes = ({
  types,
  location,
}: LegalAdviceArticleTypesProps) => {
  const navigate = useNavigate();
  /* @ts-ignore TODO: TS2339 ->  Property 'q' does not exist on type '{ [key */
  /* @ts-ignore TODO: TS2339 ->  Property 'types' does not exist on type '{ [key */
  const { q: searchQuery = '', types: queryTypes = '' } = location.query;

  const onOptionSelect = (opt: MultiSelectDropdownOptions) => {
    const getIds = Object.entries(opt)
      .filter(([, value]) => value)
      .map(([key]) => {
        const splitOption = key.split('-');
        return splitOption[splitOption.length - 1];
      });

    const queryParams = new URLSearchParams({
      ...(searchQuery && { q: searchQuery }),
      ...(getIds.length && { types: getIds.join(',') }),
    });

    navigate(global.location.pathname + `?${queryParams.toString()}#0`, {
      replace: true,
    });
  };

  const defaultSelectedTypes = useMemo(() => {
    const queries = {};
    queryTypes.split(',').forEach((queryType: string) => {
      const foundElement = types.find((type) => type.id === queryType);

      if (foundElement) {
        const key = `${ITEM_KEY}-${queryType}`;

        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
        queries[key] = {
          label: foundElement.title,
          itemsCount: foundElement.numberOfArticles,
        };
      }
    });
    return queries;
  }, [types, queryTypes]);

  return (
    <div className={styles.ArticleTypes}>
      <MultiSelectDropdown
        label="Inhalte filtern"
        onSelect={onOptionSelect}
        defaultSelected={defaultSelectedTypes}
      >
        {types.map((articleType) => {
          const key = `${ITEM_KEY}-${articleType.id}`;

          return (
            <MultiSelectDropdownItem
              label={articleType.title}
              key={key}
              className={styles.DropdownItem}
              itemsCount={articleType.numberOfArticles}
            >
              <span className={styles.Label}>
                {articleType.title} ({articleType.numberOfArticles})
              </span>
            </MultiSelectDropdownItem>
          );
        })}
      </MultiSelectDropdown>
    </div>
  );
};

export default LegalAdviceArticleTypes;
