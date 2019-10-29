import React from "react";
import Head from "next/head";
import { AbFlex, Flex } from "./styled-rebass";
import LayoutFooter from "./layout-footer";
import { SidebarNavigation } from "./sidebar-navigation";
import Head from "next/head";

interface ILayoutProps {
  title?: string;
}

export interface ILayoutState {
  sidebarStatus: "open" | "closed";
  showMessagingAddressBook: boolean;
}

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
    const { children, title } = this.props;

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
        width={1}
        alignItems="center"
        flex="1 1 auto"
        ref={this.sidebarContainerRef}
      >
        <Head>
          <title>{title || ""}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {/* <LayoutHeader
        // handleCreateNewMessageThread={this.handleCreateNewMessageThread}
        // toggleSidebarOpenOrClosed={this.toggleSidebarOpenOrClosed}
        // handleCancelNewMessageThread={this.handleCancelNewMessageThread}
        // showMessagingAddressBook={this.state.showMessagingAddressBook}
        /> */}
        {/* <HeaderDropdown
          handleCreateNewMessageThread={this.handleCreateNewMessageThread}
          toggleSidebarOpenOrClosed={this.toggleSidebarOpenOrClosed}
          handleCancelNewMessageThread={this.handleCancelNewMessageThread}
          showMessagingAddressBook={this.state.showMessagingAddressBook}
        /> */}
        {/* <Flex
          width={[1, 1, 1, "960px"]}
          border="crimson"
          style={{ position: "relative" }}
        >
          <SidebarNavigation sidebarStatus={this.state.sidebarStatus} />
        </Flex> */}
        <>
          <Flex
            flex="1 1 auto"
            width={[1, 1, 1, "960px"]}
            flexDirection="column"
            style={{ position: "relative" }}
          >
            <Flex
              width={[1, 1, 1, "960px"]}
              minHeight="70px"
              style={{
                position: "static",
                background: "linear-gradient(5deg, #745fb5, #9066b8)"
              }}
              bg="#7386d5"
            >
              <SidebarNavigation />
            </Flex>
            {children}
          </Flex>
        </>
        <LayoutFooter />
      </AbFlex>
    );
  }
}

export default Layout;
