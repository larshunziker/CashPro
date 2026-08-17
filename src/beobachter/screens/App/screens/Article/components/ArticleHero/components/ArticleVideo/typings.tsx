import { ReactNode } from 'react';

export type ArticleVideoProps = {
  article: Article & { subtypeValue?: string };
  video: ParagraphInterface & {
    __typename?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    video?: Maybe<Video>;
    image?: Maybe<Image>;
    credit?: Maybe<Scalars['String']['output']>;
    anchorId?: Maybe<Scalars['String']['output']>;
    shortTitle?: Maybe<Scalars['String']['output']>;
    title?: Maybe<Scalars['String']['output']>;
    caption?: Maybe<Scalars['String']['output']>;
    alt?: Maybe<Scalars['String']['output']>;
    brightcoveId?: Maybe<Scalars['String']['output']>;
    duration?: Maybe<Scalars['String']['output']>;
    suppressSource?: Maybe<Scalars['Boolean']['output']>;
  };
  children?: ReactNode;
};
