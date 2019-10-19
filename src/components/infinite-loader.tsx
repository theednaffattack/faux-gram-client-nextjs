import React from "react";

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { Flex } from "./styled-rebass";

import { MessageBox } from "./message-box_v2";

interface InfiniteLoaderState {
  users: UserPageProps[];
  page: number;
  loading: boolean;
  prevBottomSentinelY: number;
  previousFromCursorLoading: boolean;
  bottomSentinelIsIntersecting: boolean;
  bottomSentinelIsLeaving: boolean;
  topSentinelIsIntersecting: boolean;
  prevTopSentinelY: number;
  prevContainerHeight: number;
  prevItemsLength: number;
}

export type TImageModalState = "open" | "closed";

interface InfiniteLoaderProps {
  fetchMore: any;
  toggleImageModal: any;
  items: any[];
  me: any;
  loadingGetMessagesByThreadId: any;
  pageInfo: any;
  imageModalState: TImageModalState;
}

interface UserPageProps {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

// const makeCancelable = (promise: Promise<any>) => {
//   let hasCanceled_ = false;

//   const wrappedPromise = new Promise((resolve, reject) => {
//     promise.then(
//       val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
//       error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
//     );
//   });

//   return {
//     promise: wrappedPromise,
//     cancel() {
//       hasCanceled_ = true;
//     }
//   };
// };

// const cancelablePromise = makeCancelable(fetch("LINK HERE"));

class InfiniteLoader extends React.Component<
  InfiniteLoaderProps,
  InfiniteLoaderState
> {
  bottomLoadingRef: React.RefObject<HTMLDivElement>;
  topLoadingRef: React.RefObject<HTMLDivElement>;
  listContainerRef: React.RefObject<HTMLDivElement>;
  scrollTopRef: React.RefObject<HTMLLIElement>;
  scrollBottomRef: React.RefObject<HTMLLIElement>;

  topObserver: any;
  bottomObserver: any;
  constructor(props: InfiniteLoaderProps) {
    super(props);

    this.bottomLoadingRef = React.createRef();
    this.topLoadingRef = React.createRef();
    this.listContainerRef = React.createRef();
    this.scrollTopRef = React.createRef();
    this.scrollBottomRef = React.createRef();

    // this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      users: [],
      page: 0,
      loading: false,
      prevBottomSentinelY: -1,
      previousFromCursorLoading: false,
      bottomSentinelIsIntersecting: false,
      bottomSentinelIsLeaving: false,
      topSentinelIsIntersecting: false,
      prevTopSentinelY: -1,
      prevContainerHeight: -1,
      prevItemsLength: -1
    };
  }

  scrollToBottom() {
    if (this.listContainerRef && this.listContainerRef.current) {
      this.listContainerRef.current.scrollTop = this.listContainerRef.current.scrollHeight;
    }
  }

  componentDidMount() {
    let prevContainerHeight =
      (this.listContainerRef &&
        this.listContainerRef.current &&
        this.listContainerRef.current.scrollHeight) ||
      -1;

    this.scrollToBottom();

    if (this.listContainerRef && this.listContainerRef.current) {
      disableBodyScroll(this.listContainerRef.current);
    }

    this.setState({
      prevItemsLength: this.props.items.length,
      prevContainerHeight
    });

    // Options
    var options = {
      root: this.listContainerRef.current, // document.querySelector("#divRoot"), // null would be Page as root //
      rootMargin: "0px",
      threshold: 1
    };
    // Create an observer
    this.bottomObserver = new IntersectionObserver(
      this.handleBottomObserver.bind(this), //callback
      options
    );
    // Create an observer
    this.topObserver = new IntersectionObserver(
      this.handleTopObserver.bind(this), //callback
      options
    );

    //Observ the `loadingRef`
    this.topObserver.observe(this.topLoadingRef.current);
    this.bottomObserver.observe(this.bottomLoadingRef.current);
  }

  componentWillUnmount() {
    // if any body scroll locks exist from using the loader, ditch them
    clearAllBodyScrollLocks();

    // stop observing the sentinels inside the loader
    this.topObserver.unobserve(this.topLoadingRef.current);
    this.bottomObserver.unobserve(this.bottomLoadingRef.current);
  }

  handleTopObserver(
    entities: IntersectionObserverEntry[]
    // observer: IntersectionObserver
  ): void {
    const topSentinelY = entities[0].boundingClientRect.top;
    const isTopSentinelVisible = entities[0].isIntersecting;

    // if scrolling UP
    if (isTopSentinelVisible && this.props.items.length > 0) {
      const lastItem = this.props.items[this.props.items.length - 1];
      const curPage = lastItem.id;

      // if (this.props.pageInfo.hasPreviousPage) {
      //   this.props.fetchMore();
      // }

      this.setState({ page: curPage, topSentinelIsIntersecting: true });
    } else if (this.state.topSentinelIsIntersecting === true) {
      // we are EXITING the "capturing frame"
      this.setState({
        topSentinelIsIntersecting: false
      });
      //   // Do something with exiting entry

      //   // entities[0].target.setAttribute("style", ` ${originalStyles}`);
    }

    this.setState({ prevTopSentinelY: topSentinelY });
  }

  handleBottomObserver(
    entities: IntersectionObserverEntry[]
    // observer: IntersectionObserver
  ): void {
    const bottomSentinelY = entities[0].boundingClientRect.top;

    if (this.props.items.length > 0 && entities[0].isIntersecting) {
      this.setState({
        bottomSentinelIsIntersecting: true,
        bottomSentinelIsLeaving: true
      });
    } else if (this.state.bottomSentinelIsLeaving === true) {
      // we are EXITING the "capturing frame"
      this.setState({
        bottomSentinelIsIntersecting: false,
        bottomSentinelIsLeaving: false
      });
      // Do something with exiting entry

      // Ex:  entities[0].target.setAttribute("style", ` ${originalStyles}`);
    }
    // is this for scrolling up???
    if (this.state.prevBottomSentinelY < bottomSentinelY) {
      console.log(
        "WHAT DOESS THIS MEAN prevBottomSentinelY < bottomSentinelY",
        {
          prevBottomSentinelY: this.state.prevBottomSentinelY,
          bottomSentinelY
        }
      );

      this.setState({ previousFromCursorLoading: true });
    }

    // if scrolling down
    if (this.state.prevBottomSentinelY > bottomSentinelY) {
      let scrollHeight =
        this.listContainerRef && this.listContainerRef.current
          ? this.listContainerRef.current.scrollHeight
          : undefined;
      const lastItem = this.props.items[this.props.items.length - 1];
      const curPage = lastItem.id;

      this.setState({ page: curPage, prevContainerHeight: scrollHeight || -1 });
    }
    this.setState({ prevBottomSentinelY: bottomSentinelY });
  }

  render() {
    const loadingCSS = {
      height: 0,
      backgroundColor: "magenta"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    let imageModalState = this.props.imageModalState;
    return (
      <React.Fragment>
        <Flex
          flexDirection="column"
          flex="1 1 auto"
          className="container"
          width={1}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            ref={this.listContainerRef}
            id="divRoot"
            style={{
              overflowY: "scroll",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              WebkitOverflowScrolling: "touch"
            }}
          >
            <div ref={this.topLoadingRef} style={loadingCSS}>
              <span style={loadingTextCSS}>Loading...</span>
            </div>
            <ul
              style={{
                marginTop: "16px",
                marginBottom: "16px",
                listStyleType: "none",
                padding: 0
              }}
            >
              {this.props.items.map((item, index) => {
                let liWithoutRef = (
                  <li
                    key={`${item.id}-middle-${index}`}
                    className="list-sandwich-meat"
                  >
                    <MessageBox
                      allData={[]}
                      fetchMoreGetMessagesByThreadId={() =>
                        this.props.fetchMore()
                      }
                      handleRemoveInviteeToThread={() =>
                        console.log("handleRemoveInviteeToThread called")
                      }
                      images={item.node.images}
                      threadId=""
                      imageModalState={imageModalState}
                      message={item.node.message}
                      me={this.props.me}
                      createdAt={item.node.created_at}
                      type={item.node.__typename}
                      pageInfo={this.props.pageInfo}
                      style={{}}
                      handleToggleImageModal={this.props.toggleImageModal}
                      itemIndex={index}
                      sentBy={item.node.sentBy}
                    />
                  </li>
                );

                return liWithoutRef;
              })}
            </ul>
            <div ref={this.bottomLoadingRef} style={loadingCSS}>
              <span style={loadingTextCSS}>Loading...</span>
            </div>
          </div>
        </Flex>
      </React.Fragment>
    );
  }
}

export default InfiniteLoader;
