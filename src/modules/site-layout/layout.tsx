import React from "react";
import Head from "next/head";

import { AbFlex, Flex } from "../../components/styled-rebass";
import FooterNavigation from "./footer-navigation";
import Header from "./header";
// import { MyContext } from "types/types";

interface ILayoutProps {
  title?: string;
  pathname?: any;
}

export interface ILayoutState {
  sidebarStatus: "open" | "closed";
  showMessagingAddressBook: boolean;
}

export const breakWidths = [1, 1, 1, "960px"];

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  sidebarContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: ILayoutProps) {
    super(props);
    this.toggleSidebarOpenOrClosed = this.toggleSidebarOpenOrClosed.bind(this);
    this.handleCloseSideBar = this.handleCloseSideBar.bind(this);
    this.handleClickOutsideSidebar = this.handleClickOutsideSidebar.bind(this);
    this.handleCreateNewMessageThread = this.handleCreateNewMessageThread.bind(
      this
    );
    this.handleCancelNewMessageThread = this.handleCancelNewMessageThread.bind(
      this
    );

    this.handleLoadNewThreadCreated = this.handleLoadNewThreadCreated.bind(
      this
    );

    this.state = {
      sidebarStatus: "closed",
      showMessagingAddressBook: false
    };

    this.sidebarContainerRef = React.createRef();
  }

  // static getInitialProps = async ({ pathname, referer }: MyContext) => {
  //   console.log("STATIC GETINITIALPROPS IN LAYOUT", { pathname, referer });
  //   try {
  //     return { pathname, referer };
  //   } catch (err) {
  //     return { errors: err.message };
  //   }
  // };

  handleCloseSideBar() {
    this.setState({
      sidebarStatus: "closed"
    });
  }

  toggleSidebarOpenOrClosed(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const buttonId = event.currentTarget.getAttribute("id");
    console.log("SIDEBAR LIST REF", this.sidebarContainerRef);
    console.log("EVENT TARGET", event.target as Node);
    console.log("BUTTON ID", buttonId);

    if (
      this.sidebarContainerRef &&
      this.sidebarContainerRef.current &&
      this.sidebarContainerRef.current.contains(event.target as Node) &&
      buttonId !== "menu-toggle"
    ) {
      console.log("IS THIS RETURNING?");
      return;
    }
    console.log("BEFORE SETTING STATE");

    this.setState(prevState => ({
      sidebarStatus: prevState.sidebarStatus === "open" ? "closed" : "open"
    }));
  }

  handleClickOutsideSidebar(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (
      this.sidebarContainerRef &&
      this.sidebarContainerRef.current &&
      this.sidebarContainerRef.current.contains(ev.target as Node)
    ) {
      return;
    }
    if (
      this.sidebarContainerRef &&
      this.sidebarContainerRef.current &&
      this.state.sidebarStatus === "open" &&
      !this.sidebarContainerRef.current.contains(ev.target as Node)
    ) {
      this.handleCloseSideBar();
      return;
    }

    return;
  }

  handleCreateNewMessageThread() {
    this.setState(prevState => {
      return {
        showMessagingAddressBook: !prevState.showMessagingAddressBook
      };
    });
  }

  handleCancelNewMessageThread() {
    this.setState({
      showMessagingAddressBook: false
    });
  }

  handleLoadNewThreadCreated() {
    this.setState({
      showMessagingAddressBook: false
    });
  }

  componentDidMount() {
    // @ts-ignore
    document.addEventListener("mousedown", this.handleClickOutsideSidebar);
  }

  componentWillUnmount() {
    // @ts-ignore
    document.removeEventListener("mousedown", this.handleClickOutsideSidebar);
  }

  render() {
    const { children, pathname, title } = this.props;
    // const children = React.Children.map(this.props.children, (child: any) => {
    //   let newElement = React.cloneElement(child, {
    //     showMessagingAddressBook: this.state.showMessagingAddressBook,
    //     handleCreateNewMessageThread: this.handleCreateNewMessageThread,
    //     handleCancelNewMessageThread: this.handleCancelNewMessageThread,
    //     handleLoadNewThreadCreated: this.handleLoadNewThreadCreated
    //   });

    //   return newElement;
    // });

    return (
      <AbFlex
        id="layout"
        m={[0]}
        flexDirection="column"
        width={breakWidths}
        alignItems="center"
        // flex="1 1 auto"
        // bg="blue"
        // border="2px pink dashed"
        ref={this.sidebarContainerRef}
      >
        <Head>
          <title>{title || ""}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta httpEquiv="Content-Language" content="en" />
        </Head>
        <Flex
          flex="1 1 auto"
          width={breakWidths}
          flexDirection="column"
          style={{ position: "relative" }}
        >
          <Header />
          {children}
        </Flex>
        <FooterNavigation pathname={pathname} />
      </AbFlex>
    );
  }
}

export const getLayout = (page: any) => {
  return (
    <Layout pathname={page.props.pathname} title={page.props.title}>
      {page}
    </Layout>
  );
};

export default Layout;
