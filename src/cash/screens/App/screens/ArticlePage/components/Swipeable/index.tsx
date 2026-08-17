import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
import { useLazyQuery } from '@apollo/client';
import raf from 'raf';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import { useMutationObserver } from '../../../../../../../shared/hooks/useMutationObserver';
import ArticlePageDefault from '../Default';
import { dispatchHybridAppEvent } from '../../../../../../../common/components/HybridAppProvider';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { apolloConfig } from './apolloConfig';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import {
  DIRECTION_BACKWARDS,
  DIRECTION_FORWARDS,
} from '../../../../../../../common/components/Slider/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
const ArticlePageSwipeable = ({ article, location }) => {
  const navigate = useStableNavigate();
  const { isSSR } = useSSRContext();
  const [activeIndex, setActiveIndex] = useState(1);
  const viewportWidth = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state)?.width,
  );
  const { query: rateByCurrencyQuery, ...rateByCurrencyOptions } =
    apolloConfig.options({
      location,
    });
  const [
    getPrevNextChannelEntities,
    { data, loading: prevNextDataLoading, called },
  ] = useLazyQuery(rateByCurrencyQuery, rateByCurrencyOptions);

  if (!called && !prevNextDataLoading && !isSSR) {
    raf(() => {
      getPrevNextChannelEntities();
    });
  }
  let articles = useMemo(() => [{ article }], [article]);
  const currentArticle = useRef(article);
  const updateHightRef = useRef(null);
  const sliderHeight = useRef(0);
  const slideRef = useRef(null);
  const prevArticles = useRef([]);
  const nextArticles = useRef([]);

  if (data?.environment?.routeByPath?.object?.prevChannelEntities?.edges) {
    prevArticles.current =
      data?.environment?.routeByPath?.object?.prevChannelEntities?.edges;
  }
  if (data?.environment?.routeByPath?.object?.nextChannelEntities?.edges) {
    nextArticles.current =
      data?.environment?.routeByPath?.object?.nextChannelEntities?.edges;
  }

  // prepare the newer articles array
  if (nextArticles.current) {
    nextArticles.current.map(({ node }) => {
      /* @ts-ignore TODO: TS2339 ->  Property 'title' does not exist on type 'never'. */
      if (node?.title) {
        // add node to articles on first position
        articles = [{ article: node }, ...articles];
      }
    });
  }

  // prepare the older articles array
  if (prevArticles.current) {
    prevArticles.current.map(({ node }) => {
      /* @ts-ignore TODO: TS2339 ->  Property 'title' does not exist on type 'never'. */
      if (node?.title) {
        articles = [...articles, { article: node }];
      }
    });
  }

  // if we have less articles than 3 then we need to init the active index by the current article
  // by default we use the second article as the active index
  if (articles.length < 3 && !prevNextDataLoading && called) {
    const index = articles.findIndex(
      (a) => a.article.preferredUri === article.preferredUri,
    );

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const handleIndexChange = (index) => {
    const swipeDirection =
      (activeIndex > index && DIRECTION_BACKWARDS) || DIRECTION_FORWARDS;

    raf(() => {
      document.documentElement.scrollTop = 0;
      setActiveIndex(index);
      navigate(articles[index]?.article?.preferredUri);
      dispatchHybridAppEvent('has-article-page-swiped', {
        href: articles[index]?.article?.preferredUri || '',
      });
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'article_swiped',
          swipe_direction: swipeDirection,
          swipe_from: article?.preferredUri,
          swipe_to: articles[index]?.article?.preferredUri,
        },
      });
    });
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'mutations' implicitly has an 'any' type. */
  const onMutation = useCallback((mutations) => {
    mutations.forEach((mutation: any) => {
      if (mutation.type === 'childList') {
        // check if the mutation height did change if so the slider height needs to be updated by using the updateHeight function updateHightRef.current.updateHeight();
        if (mutation.target.clientHeight !== sliderHeight.current) {
          sliderHeight.current = mutation.target.clientHeight;
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          updateHightRef.current.updateHeight();
        }
      }
    });
  }, []);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'Node'. */
  useMutationObserver(slideRef.current, onMutation, {
    subtree: true,
    attributes: false,
    childList: true,
  });

  useEffect(() => {
    if (updateHightRef?.current) {
      /* @ts-ignore TODO: TS2339 ->  Property 'updateHeight' does not exist on type 'never'. */
      updateHightRef.current.updateHeight();
    }
  }, [viewportWidth]);

  return (
    <div ref={slideRef}>
      <SwipeableViews
        index={(articles.length >= 2 && activeIndex) || 0}
        onChangeIndex={handleIndexChange}
        resistance
        enableMouseEvents
        animateHeight={!isSSR}
        containerStyle={{
          width: '100vw',
        }}
        className={styles.Slider}
        /* @ts-ignore TODO: TS7006 ->  Parameter 'actions' implicitly has an 'any' type. */
        action={(actions) => {
          updateHightRef.current = actions;
        }}
      >
        {articles.map(({ article: node }) => {
          return (
            <div
              key={`swipeable-article-${node?.id}`}
              className={styles.Slide}
              onTouchStart={(event: any) => {
                if (event.target.closest('table')) {
                  const currentElementByClass: any = document.querySelectorAll(
                    `.${styles.Slide}`,
                  );
                  currentElementByClass.forEach((item: HTMLDivElement) => {
                    item.style.overflow = 'auto';
                  });
                }
              }}
              onTouchEnd={() => {
                // event continues
                const currentElementByClass: any = document.querySelectorAll(
                  `.${styles.Slide}`,
                );

                currentElementByClass.forEach((item: HTMLDivElement) => {
                  item.style.overflow = 'hidden';
                });
              }}
            >
              <MemoizedArticlePage
                article={node}
                location={location}
                isInView={node.id === currentArticle.current.id}
              />
            </div>
          );
        })}
      </SwipeableViews>
    </div>
  );
};

function arePropsEqual() {
  return true;
}

const MemoizedArticlePage = memo((props: any) => {
  return <ArticlePageDefault {...props} />;
}, arePropsEqual);

export default ArticlePageSwipeable;
