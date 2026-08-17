import React from 'react';
import { useQuery } from '@apollo/client';
import { CONTENT_BOX_TYPE } from '../../../shared/constants/content';
import { EditorialPicksFactoryOptions, EditorialPicksProps } from './typings';

const EditorialPicksFactory = ({
  ContentBox,
  styles,
  apolloConfig,
  Skeleton,
}: EditorialPicksFactoryOptions) => {
  const EditorialPicks = ({ ...props }: EditorialPicksProps) => {
    const {
      contentBoxTitle,
      origin,
      publication,
      additionalPublications = [],
      overwriteTitleWithShortTitle = false,
    } = props;

    const { query, ...options } = apolloConfig.options({
      params: {
        title: contentBoxTitle,
        contentTypes: [CONTENT_BOX_TYPE] as any,
        publication,
        additionalPublications: additionalPublications as any,
      },
    });

    const { data, loading } = useQuery(query, options);
    const nodes = data?.environment?.content?.edges || null;

    if (loading) {
      return <Skeleton />;
    }

    return (
      <>
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
        {nodes?.map(({ node }, index) => {
          const nodeCopy = JSON.parse(JSON.stringify(node));
          if (nodeCopy?.__typename === CONTENT_BOX_TYPE) {
            if (overwriteTitleWithShortTitle) {
              nodeCopy.title = nodeCopy.shortTitle;
            }

            return (
              <div
                key={`editorial-picks-${node.title}-${index}`}
                className={styles.Wrapper}
              >
                <ContentBox
                  component={nodeCopy.contentSourceValue}
                  node={{ ...nodeCopy, hideTitle: nodeCopy.hideTitle }}
                  origin={origin}
                />
              </div>
            );
          }
        })}
      </>
    );
  };

  return EditorialPicks;
};

export default EditorialPicksFactory;
