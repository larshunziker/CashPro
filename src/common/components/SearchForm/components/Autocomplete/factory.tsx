import React, { ComponentType } from 'react';
import classNames from 'classnames';
import Link from '../../../LinkLegacy';
import { IMAGE_GALLERY_CONTENT_TYPE } from './../../../../../shared/constants/content';
import {
  AutocompleteComponent,
  AutocompleteFactoryOptions,
  AutocompleteFactoryOptionsStyles,
  AutocompleteFactoryProps,
} from './typings';

type AutocompleteFactoryPropsInner = AutocompleteFactoryProps & {
  data: ApolloData & {
    globalSearch: SearchableUnionConnection;
  };
};

const defaultStyles: AutocompleteFactoryOptionsStyles = {
  Wrapper: '',
  Link: '',
  LinkWrapper: '',
};

const autocompleteFactory: (
  factoryOptions: AutocompleteFactoryOptions,
) => AutocompleteComponent = ({ Icon, IconTypes, styles: appStyles }) => {
  const Autocomplete: ComponentType<AutocompleteFactoryPropsInner> = (
    props,
  ) => {
    const { data, menuCloseHandler } = props;
    if (!data?.globalSearch?.edges) {
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <ul className={styles.Wrapper} data-testid="autocomplete-factory-wrapper">
        {data?.globalSearch?.edges &&
          Array.isArray(data.globalSearch.edges) &&
          /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<SearchableUnionEdge>'. */
          data.globalSearch.edges.map(({ node }, index) => {
            const title = (node as Article).title || (node as Keyword).label;
            const isImageGallery =
              node.__typename === IMAGE_GALLERY_CONTENT_TYPE;
            const hasVideo = (node as Article).hasVideo;

            return (
              <li
                data-testid="autocomplete-factory-item"
                key={`autocomplete-item-${node?.preferredUri || ''}${index}`}
                className={styles.LinkWrapper}
              >
                <Link
                  onClick={menuCloseHandler}
                  link={{ path: node.preferredUri }}
                  className={classNames(
                    'search-autocomplete-results',
                    styles.Link,
                  )}
                >
                  <>
                    <span>{title}</span>
                    {IconTypes && (hasVideo || isImageGallery) && (
                      <Icon
                        type={classNames({
                          [IconTypes.VideoIcon]: hasVideo,
                          [IconTypes.CamIcon]: isImageGallery,
                        })}
                        addClass={styles.IconStyle}
                      />
                    )}
                  </>
                </Link>
              </li>
            );
          })}
      </ul>
    );
  };

  return Autocomplete;
};

export default autocompleteFactory;
