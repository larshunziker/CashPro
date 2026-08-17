type UnixTimestamp = number;
type SafeHTML = string;

type Post = {
  author: {
    userId: number;
    username: string;
  };
  message: SafeHTML;
  permalink: string;
  time: UnixTimestamp;
};

type Board = {
  boardId: number;
  permalink: string;
  title: string;
};

type Thread = {
  permalink: string;
  threadId: number;
  title: string;
};

export type LatestPosts = {
  board: Board;
  thread: Thread;
  posts: Post[];
};

export type LatestPostsProps = {
  path: string;
  count: number;
};
