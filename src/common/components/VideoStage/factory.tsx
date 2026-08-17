import React, { Component, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';
import {
  VideoStageFactoryOptions,
  VideoStageFactoryOptionsStyles,
  VideoStageProps,
  VideoStageState,
} from './typings';

export type VideoStagePropsInner = VideoStageProps & {
  scrollOffset: number;
};

const defaultStyles: VideoStageFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  ShortTitle: '',
  Items: '',
  IsActive: '',
  LeftBoxCols: '',
  RightBoxCols: '',
  InnerWrapper: '',
  HeadingWrapper: '',
  Heading: '',
  StageWrapper: '',
  ContentWrapper: '',
  UtilityBarWrapper: '',
};

const VideoStageFactory = ({
  grid,
  VideoPlayer,
  Link,
  Teaser,
  SmoothScroll,
  ImageCaption,
  UtilityBar,
  styles: appStyles,
  teaserLayout,
  isCaptionVisible = false,
  isObserveForAutoplayEnabled = false,
  hasToLazyLoadBrightcoveScript = true,
  shouldRerender,
}: VideoStageFactoryOptions) => {
  class VideoStage extends Component<VideoStagePropsInner, VideoStageState> {
    constructor(props: VideoStagePropsInner) {
      super(props);

      this.state = {
        activeIndex: 0,
        prevIndex: 0,
        currentId: this.props.videoStage?.id || '',
        isSSR: true,
      };
    }

    getStyles = () =>
      (typeof appStyles === 'function' && appStyles(this.props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    setActiveIndex = (index: number) => {
      if (this.state.activeIndex !== index) {
        this.setState({
          activeIndex: index,
        });
      }
    };

    setPrevIndex = (index: number) => {
      if (this.state.prevIndex !== index) {
        this.setState({
          prevIndex: index,
        });
      }
    };

    setCurrentId = (id: string) => {
      if (this.state.currentId !== id) {
        this.setState({
          currentId: id,
        });
      }
    };

    clearUpdateActiveIndex = (
      activeIndex: number,
      currentId: string,
      event: MouseEvent,
    ) => {
      event.preventDefault();
      this.setPrevIndex(this.state.activeIndex);
      this.setActiveIndex(activeIndex);
      this.setCurrentId(currentId);
    };

    styles = this.getStyles();

    renderItem = (item: VideoEdge, index: number): ReactElement => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        data-testid={`video-item-${index}`}
        onClick={(event: MouseEvent) => {
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          this.clearUpdateActiveIndex(index, item.node.id, event);
        }}
        key={`video-stage-item-${item.node?.id || index}`}
        className={classNames(this.styles.Items, {
          [this.styles.IsActive]: this.state.activeIndex === index,
        })}
        tabIndex={0}
        role="link"
      >
        <Teaser
          component={teaserLayout}
          node={this.prepareTeaserInterface(item)}
          {...this.prepareTeaserInterface(item)}
          isActive={this.state.activeIndex === index}
        />
      </div>
    );

    prepareTeaserInterface = ({ node }: VideoEdge): TeaserInterface => ({
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string>' is not assignable to type 'string | undefined'. */
      title: '',
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string>' is not assignable to type 'string | undefined'. */
      shortTitle: '',
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ImageParagraph> | TeaserImageInterface' is not assignable to type '(TypeUnion & { credit? */
      teaserImage: {
        caption: node?.caption || '',
        image: {
          credit: node?.credit || '',
          file: {
            relativeOriginPath: node?.image?.file?.relativeOriginPath || null,
            alt: node?.image?.file?.alt || '',
          },
        },
      } as TeaserImageInterface,
      ...node,
      preferredUri: `#video-stage-${this.props.videoStage.id}`,
    });

    componentDidMount() {
      this.setState({ isSSR: false });
    }

    shouldComponentUpdate = (
      nextProps: VideoStagePropsInner,
      nextState: VideoStageState,
    ) => {
      if (
        this.state.activeIndex !== nextState.activeIndex ||
        this.state.prevIndex !== nextState.prevIndex
      ) {
        return true;
      }

      if (shouldRerender) {
        return shouldRerender(this.props, nextProps);
      }

      return false;
    };

    render(): ReactElement {
      const { videoStage, isSplittedPageLayout = false } = this.props;
      const { activeIndex, prevIndex } = this.state;
      const itemIndex =
        activeIndex !== null && activeIndex >= 0 ? activeIndex : prevIndex || 0;

      if (
        !videoStage?.id ||
        !videoStage?.items?.edges ||
        !Array.isArray(videoStage.items.edges) ||
        videoStage?.items?.edges.length === 0
      ) {
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
        return null;
      }

      const video = videoStage?.items?.edges?.[itemIndex]?.node;

      return (
        <SmoothScroll
          offset={this.props.scrollOffset}
          anchorId={`video-stage-${videoStage.id}`}
        >
          <div
            data-testid="video-stage-wrapper"
            className={this.styles.Wrapper}
          >
            <div
              className={classNames(this.styles.Container, {
                [grid.Container]: !isSplittedPageLayout,
              })}
            >
              <div className={this.styles.InnerWrapper}>
                <div className={this.styles.HeadingWrapper}>
                  {videoStage.title && (
                    <>
                      {videoStage?.link?.path ? (
                        /* @ts-ignore TODO: TS2322 ->  Type '{ className */
                        <Link
                          {...videoStage.link}
                          className={this.styles.Heading}
                          label={videoStage.title}
                        />
                      ) : (
                        <span className={this.styles.Heading}>
                          {videoStage.title}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className={grid.Row}>
                  <div className={this.styles.LeftBoxCols}>
                    <div
                      className={this.styles.StageWrapper}
                      data-testid={`video-stage-wrapper-${activeIndex}`}
                    >
                      {videoStage?.items?.edges &&
                        Array.isArray(videoStage.items.edges) &&
                        videoStage.items.edges.length > 0 &&
                        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                        videoStage.items.edges[itemIndex].node && (
                          <VideoPlayer
                            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                            video={videoStage.items.edges[itemIndex].node}
                            isObserveForAutoplayEnabled={
                              isObserveForAutoplayEnabled
                            }
                            hasToLazyLoadBrightcoveScript={
                              hasToLazyLoadBrightcoveScript
                            }
                            autoPlay={!(activeIndex === 0 && prevIndex === 0)}
                          />
                        )}
                    </div>
                    <div className={this.styles.ContentWrapper}>
                      <div className={this.styles.DetailWrapper}>
                        {video && (video.credit || video.caption) && (
                          <ImageCaption
                            credit={video.credit}
                            caption={isCaptionVisible && video.caption}
                          />
                        )}
                        {video?.shortTitle && (
                          <p className={this.styles.ShortTitle}>
                            {video.shortTitle}
                          </p>
                        )}
                        {video?.title && (
                          <p className={this.styles.Title}>{video.title}</p>
                        )}
                      </div>
                      {UtilityBar && (
                        <div className={this.styles.UtilityBarWrapper}>
                          <UtilityBar
                            title={video?.title}
                            shareUrl={video?.preferredUri}
                            imageUrl={video?.image?.file?.relativeOriginPath}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={this.styles.RightBoxCols}>
                    {videoStage?.items?.edges &&
                      Array.isArray(videoStage.items.edges) &&
                      videoStage?.items?.edges.length > 0 &&
                      videoStage.items.edges.map(this.renderItem)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SmoothScroll>
      );
    }
  }

  return VideoStage;
};

export default VideoStageFactory;
