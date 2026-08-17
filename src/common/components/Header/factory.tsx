import React from 'react';
import classNames from 'classnames';
import { useSSRContext } from '../SSRContext';
import InView from '../../components/InView';
import {
  HeaderFactoryOptions,
  HeaderFactoryOptionsStyles,
  HeaderProps,
} from './typings';

const defaultStyles: HeaderFactoryOptionsStyles = {
  Wrapper: '',
  IsSticky: '',
  Header: '',
  Placeholder: '',
};

export default ({
  HeaderInner,
  PartnerClaim,
  placeholderId,
  observerConfigs: appObserverConfigs,
  reInitObserverOnLocationChange = [false, false],
  reInitObserverOnViewportLabelChange = [false, false],
  styles: appStyles,
}: HeaderFactoryOptions<any>) => {
  const Header = (props: HeaderProps) => {
    const {
      hasStickiness = true,
      subtypeValue = '',
      isHome = false,
      publication = '',
      isMarketingPageReducedHeader = false,
      isMarketingPage = false,
      isPuzzlePage = false,
      contentType = '',
      channel,
      isInArticle,
    } = props;

    const { isSSR } = useSSRContext();

    const observerConfigs =
      (typeof appObserverConfigs === 'function' && appObserverConfigs(props)) ||
      (Array.isArray(appObserverConfigs) && appObserverConfigs) ||
      null;

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    if (!hasStickiness) {
      return (
        <header
          className={classNames(styles.Wrapper)}
          style={{ zIndex: 0 }}
          data-testid="header-inner-wrapper"
        >
          <div className={styles.Header}>
            <HeaderInner
              subtypeValue={subtypeValue}
              isSticky={false}
              hasStickiness={hasStickiness}
              isHome={isHome}
              isMarketingPageReducedHeader={isMarketingPageReducedHeader}
              isMarketingPage={isMarketingPage}
              isPuzzlePage={isPuzzlePage}
              contentType={contentType}
              channel={channel}
              isInArticle={isInArticle}
            />
          </div>
        </header>
      );
    }

    return (
      <InView // TODO pass here info it's marketing or not and add GridCentered somewhere here to handle both HeaderInner and PartnerClaim in one place
        isInitialInView
        /* @ts-ignore TODO: TS2322 ->  Type 'InViewConfig | null' is not assignable to type 'UseInViewConfig'. */
        config={observerConfigs && observerConfigs[0]}
        reInitOnViewportLabelChange={reInitObserverOnViewportLabelChange?.[0]}
        reInitOnLocationChange={reInitObserverOnLocationChange?.[0]}
      >
        {({ isInView }) => {
          return (
            <InView
              isInitialInView
              /* @ts-ignore TODO: TS2322 ->  Type 'InViewConfig | null' is not assignable to type 'UseInViewConfig'. */
              config={observerConfigs && observerConfigs[1]}
              reInitOnViewportLabelChange={
                reInitObserverOnViewportLabelChange?.[1]
              }
              reInitOnLocationChange={reInitObserverOnLocationChange?.[1]}
              isObserveDelayed
            >
              {({ isInView: isPlaceholderInView }) => {
                return (
                  <>
                    {PartnerClaim && (
                      <PartnerClaim
                        publication={publication}
                        subtypeValue={subtypeValue || ''}
                      />
                    )}
                    <div
                      className={classNames(placeholderId, styles.Placeholder)}
                    >
                      <header
                        className={classNames(styles.Wrapper, {
                          [styles.IsSticky]: !isInView,
                        })}
                        data-testid="header-inner-sticky-wrapper"
                      >
                        <div className={styles.Header}>
                          <HeaderInner
                            isVisible={isSSR || (!isSSR && isInView)}
                            isCollapsed={
                              !isSSR && !isInView && !isPlaceholderInView
                            }
                            hasStickiness={hasStickiness}
                            subtypeValue={subtypeValue || ''}
                            publication={publication}
                            isHome={isHome}
                            isMarketingPageReducedHeader={
                              isMarketingPageReducedHeader
                            }
                            isMarketingPage={isMarketingPage}
                            isPuzzlePage={isPuzzlePage}
                            contentType={contentType}
                            channel={channel}
                            isInArticle={isInArticle}
                          />
                        </div>
                      </header>
                    </div>
                  </>
                );
              }}
            </InView>
          );
        }}
      </InView>
    );
  };

  return Header;
};
