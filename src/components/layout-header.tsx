import React from "react";

// import HeaderDropdown from "./header-dropdown";
// import { Flex } from "./styled-rebass";
import { Flex, Heading } from "rebass";

import { SidebarNavigation } from "./sidebar-navigation";

const breakWidths = [1, 1, 1, "960px"];

// export interface ILayoutHeader {
//   toggleSidebarOpenOrClosed: any;
//   handleCreateNewMessageThread: any;
//   showMessagingAddressBook: boolean;
//   handleCancelNewMessageThread: any;
// }

// {
//   // @ts-ignore
//   toggleSidebarOpenOrClosed,
//   // @ts-ignore
//   handleCreateNewMessageThread,
//   // @ts-ignore
//   showMessagingAddressBook,
//   // @ts-ignore
//   handleCancelNewMessageThread
// }: ILayoutHeader

function LayoutHeader() {
  return (
    // <HeaderDropdown
    //   showMessagingAddressBook={showMessagingAddressBook}
    //   handleCancelNewMessageThread={handleCancelNewMessageThread}
    //   handleCreateNewMessageThread={handleCreateNewMessageThread}
    //   toggleSidebarOpenOrClosed={toggleSidebarOpenOrClosed}
    // />
    <Flex
      flexDirection="row"
      alignItems="center"
      width={breakWidths}
      bg="#7386d5"
      color="white"
      px={[1, 1, 4]}
      as="nav"
      style={{
        background: "linear-gradient(5deg, #745fb5, #9066b8)",
        position: "relative",
        minHeight: "70px"
      }}
    >
      <SidebarNavigation />
      <Heading as="h1">Faux Gram</Heading>
      Content
    </Flex>
  );
}

export default LayoutHeader;
