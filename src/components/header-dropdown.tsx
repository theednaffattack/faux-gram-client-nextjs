import React, { Component } from "react";

import {
  Button,
  Flex,
  Heading,
  NavLink,
  StyledUl_v1 as StyledUI,
  Text
} from "./styled-rebass";

import { Content } from "./posed-components";
import MenuButton from "./menu-button";

const breakWidths = [1, 1, 1, "960px"];

const rootTitle = "Faux Gram: ";

interface IPageProps {
  name: string;
  icon: string;
  href: string;
  linkText: string;
  title: string;
}

export const pages: IPageProps[] = [
  {
    name: `home`,
    icon: `home`,
    href: "/",
    linkText: `Home`,
    title: `${rootTitle}home`
  },
  {
    name: "about",
    icon: `home`,
    href: `/about`,
    linkText: `About`,
    title: `${rootTitle}about`
  },
  {
    name: "messages",
    icon: `home`,
    href: `/messages`,
    linkText: `Messages`,
    title: `${rootTitle}messages`
  },
  {
    name: "post",
    icon: `home`,
    href: `/post`,
    linkText: `Post Snaps`,
    title: `${rootTitle}post`
  },
  {
    name: "feed",
    icon: `home`,
    href: `/feed`,
    linkText: `Feed`,
    title: `${rootTitle}feed`
  },
  {
    name: "login",
    icon: `home`,
    href: `/login`,
    linkText: `Login`,
    title: `${rootTitle}login`
  },
  {
    name: "profile",
    icon: `home`,
    href: `/profile`,
    linkText: `Profile`,
    title: `${rootTitle}profile`
  }
];

export interface IHeaderDropdownState {
  dropdownState: string;
}

export interface ILayoutHeaderProps {
  toggleSidebarOpenOrClosed: any;
  handleCreateNewMessageThread: any;
  handleCancelNewMessageThread: any;

  showMessagingAddressBook: boolean;
}

export default class HeaderDropdown extends Component<
  ILayoutHeaderProps,
  IHeaderDropdownState
> {
  constructor(props: ILayoutHeaderProps) {
    super(props);

    this.toggleMenuOpenOrClosed = this.toggleMenuOpenOrClosed.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);

    this.state = {
      dropdownState: "closed"
    };
  }
  toggleMenuOpenOrClosed() {
    this.setState(prevState => ({
      dropdownState: prevState.dropdownState === "closed" ? "open" : "closed"
    }));
  }
  handleNavClick() {
    this.toggleMenuOpenOrClosed();
    console.log("nav clicked");
  }
  render() {
    const {
      handleCreateNewMessageThread,
      handleCancelNewMessageThread,
      showMessagingAddressBook
    } = this.props;
    return (
      <React.Fragment>
        <Flex
          flexDirection="row"
          alignItems="center"
          // bg="rebeccapurple"
          color="white"
          // width={breakWidths}
          width={breakWidths}
          // px={[1, 1, 4]}
          bg="#7386d5"
          style={{
            background: "linear-gradient(5deg, #745fb5, #9066b8)",
            position: "relative"
          }}
        >
          <MenuButton
            toggleMenuOpenOrClosed={this.props.toggleSidebarOpenOrClosed}
            dropdownMenu={this.state.dropdownState}
          />
          <Heading as="h1">Faux Gram</Heading>
          <Button
            type="button"
            onClick={
              showMessagingAddressBook
                ? handleCancelNewMessageThread
                : handleCreateNewMessageThread
            }
          >
            {showMessagingAddressBook === true ? (
              <Text>cancel</Text>
            ) : (
              <Text fontSize="1.5em">+</Text>
            )}
          </Button>
        </Flex>
        <Flex width={breakWidths} style={{ position: "relative" }}>
          <Content
            flexDirection="column"
            width={breakWidths}
            pose={this.state.dropdownState === "open" ? "open" : "closed"}
            style={{
              background: "linear-gradient(5deg, #745fb5, #9066b8)",
              position: "absolute",
              top: "0",
              zIndex: 8
            }}
          >
            <StyledUI>
              {this.state.dropdownState === "open"
                ? pages.map(item => (
                    <NavLink onClick={this.handleNavClick} to={item.href}>
                      {item.linkText}
                    </NavLink>
                  ))
                : ""}
            </StyledUI>
          </Content>
        </Flex>
      </React.Fragment>
    );
  }
}
