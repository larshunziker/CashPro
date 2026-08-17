import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  DATE_FORMAT_MONTHNAME_FULL,
  formatDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { replaceAll } from '../../../../../../../../../shared/helpers/replaceAll';
import { log } from '../../../../../../../../../shared/helpers/utils';
import Icon from '../../../../../Icon';
import { FORUM_ENDPOINT } from './constants';
import styles from './styles.legacy.css';
import { LatestPosts, LatestPostsProps } from './typings';

const ForumPosts = ({ path, count }: LatestPostsProps) => {
  if (!count || count < 1) {
    count = 3;
  } else if (count > 20) {
    count = 20;
  }
  const [postIsCollapsed, setPostIsCollapsed] = useState(
    new Array(count).fill(true),
  );
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'LatestPosts | (() => LatestPosts)'. */
  const [latestPosts, setLatestPosts] = useState<LatestPosts>(null);
  const [showPosts, setShowPosts] = useState(null);
  const postRefs = useRef([]);

  useEffect(() => {
    const fetchLatestPosts = (path: string, count: number) => {
      const url = `${FORUM_ENDPOINT}/?count=${count}&path=${path}`;
      try {
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            setLatestPosts(res.data);

            // waiting for the next frame
            setTimeout(() => {
              /* @ts-ignore TODO: TS7006 ->  Parameter '_post' implicitly has an 'any' type. */
              /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
              const visiblePosts = res?.data?.posts?.map((_post, index) => {
                return showButton(index);
              });
              setShowPosts(visiblePosts);
            }, 0);
          })
          .catch((error) => {
            log('Fetching forum data failed', error, 'red');
          });
      } catch (error) {
        log('Fetching forum data failed', error, 'red');
      }
    };
    if (!latestPosts && !showPosts) {
      fetchLatestPosts(path, count);
    }
  }, [count, path, latestPosts, showPosts, postIsCollapsed]);

  const togglePost = (index: number) => {
    const post = postRefs.current[index];
    if (postIsCollapsed[index]) {
      // Timeout of 1000ms is needed to wait for the animation to end.
      setTimeout(() => {
        // Set post to correct hight to remove lag when closing
        /* @ts-ignore TODO: TS2339 ->  Property 'offsetHeight' does not exist on type 'never'. */
        const height = post.offsetHeight;
        /* @ts-ignore TODO: TS2339 ->  Property 'style' does not exist on type 'never'. */
        post.style.maxHeight = `${height}px`;
      }, 1000);
    } else {
      /* @ts-ignore TODO: TS2339 ->  Property 'style' does not exist on type 'never'. */
      post.style.maxHeight = null;
    }
    postIsCollapsed[index] = postIsCollapsed[index] ? false : true;
    setPostIsCollapsed(JSON.parse(JSON.stringify(postIsCollapsed)));
  };

  const showButton = (index: number) => {
    const postItem = document.getElementsByClassName(styles.Post)[index];
    const messageItem = document.getElementsByClassName(styles.Message)[index];

    // the substract of 56 is needed for the header part in the post (name and date of author)
    // the height of all elements including the margins is ~56px
    if (messageItem?.clientHeight >= postItem?.clientHeight - 56) {
      return 'show';
    }
    return 'hide';
  };

  if (latestPosts) {
    return (
      <>
        <p className={styles.Title}>Die neusten Foren Posts zum Thema</p>
        {(latestPosts && (
          <div className={styles.Posts}>
            <p className={styles.ThreadTitle}>
              <span>Thread: </span>
              <a
                className={styles.Link}
                href={latestPosts.posts[0].permalink}
                target="_blank"
              >
                {latestPosts.thread.title}
              </a>
            </p>
            {latestPosts.posts.map((post, index) => {
              const enhancedPostMessage = replaceAll(
                // strip out all unwanted inline styles (script tags are stripped out on the endpoint)
                replaceAll(post.message, /style=\"[^"]*\"/g, ''),
                /href=/g,
                " onClick='window.handleWysiwygLink(event)' href=",
              );

              return (
                <div key={`post-${index}-${post.author.userId}-${post.time}`}>
                  <div className={classNames(styles.PostWrapper)}>
                    <div
                      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLDivElement | null' is not assignable to parameter of type 'never'. */
                      ref={(ref) => postRefs.current.push(ref)}
                      className={classNames(styles.Post, {
                        [styles.Open]: !postIsCollapsed[index],
                        [styles.Closed]:
                          postIsCollapsed[index] &&
                          showPosts?.[index] !== 'hide',
                      })}
                    >
                      <p>
                        <span>Von </span>
                        <span className={styles.Username}>
                          {post.author.username}
                        </span>
                        <a
                          className={classNames(
                            styles.Link,
                            styles.CommentLink,
                          )}
                          href={post.permalink}
                          target="_blank"
                        >
                          zum Kommentar
                        </a>
                      </p>
                      <p className={styles.Info}>
                        {formatDate(
                          post.time * 1000,
                          DATE_FORMAT_MONTHNAME_FULL,
                        )}
                      </p>
                      <div
                        className={styles.Message}
                        dangerouslySetInnerHTML={{
                          __html: enhancedPostMessage,
                        }}
                      ></div>
                    </div>
                    <button
                      className={classNames(styles.CollapsButton, {
                        [styles.HideMoreButton]: showPosts?.[index] === 'hide',
                      })}
                      onClick={() => togglePost(index)}
                    >
                      <span>{postIsCollapsed[index] ? 'Mehr' : 'Weniger'}</span>
                      <Icon
                        type={
                          postIsCollapsed[index]
                            ? 'IconChevronDown'
                            : 'IconChevronUp'
                        }
                      />
                    </button>
                  </div>
                </div>
              );
            })}
            <a
              className={styles.Link}
              href={latestPosts.posts[0].permalink}
              target="_blank"
            >
              Direkt zum Thread
            </a>
          </div>
        )) ||
          null}
      </>
    );
  }
  return (
    <div>
      <p className={styles.Title}>Die neusten Foren Posts zum Thema</p>
      <div className={styles.Message}>
        Zu diesem Thema sind keine Foren Posts vorhanden
      </div>
    </div>
  );
};

export default ForumPosts;
