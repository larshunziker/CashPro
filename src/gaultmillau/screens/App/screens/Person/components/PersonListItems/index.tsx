import React, { ComponentType } from 'react';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_TEASER_1_1_SMALL } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { PersonListItemsProps } from './typings';

type PersonListItemsPropsInner = PersonListItemsProps;

const PersonListItems: ComponentType<PersonListItemsPropsInner> = ({
  list,
  language,
}) => (
  <div className={`person-list ${styles.Wrapper}`}>
    {list?.edges &&
      Array.isArray(list.edges) &&
      list.edges.length > 0 &&
      /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<PersonEdge>'. */
      list.edges.map(({ node }) => {
        if (!node?.teaserImage?.image?.file) {
          return null;
        }

        return (
          <Link
            path={`${
              language === 'fr' ? '/fr/search/' : '/suche/'
            }${encodeURIComponent(node.lastName || '')}`.toLowerCase()}
            className={styles.ListItem}
            key={`person-list-item-${node.id}`}
          >
            <>
              <Picture
                style_320={STYLE_TEASER_1_1_SMALL}
                relativeOrigin={
                  node?.teaserImage?.image?.file?.relativeOriginPath
                }
                focalPointX={node?.teaserImage?.image?.file?.focalPointX}
                focalPointY={node?.teaserImage?.image?.file?.focalPointY}
                className={styles.Thumbnail}
                alt={node.teaserImage.image.file.alt}
              />

              <span className={styles.PersonName}>{`${node.lastName || ''}, ${
                node.firstName || ''
              }`}</span>
            </>
          </Link>
        );
      })}
  </div>
);

export default PersonListItems;
