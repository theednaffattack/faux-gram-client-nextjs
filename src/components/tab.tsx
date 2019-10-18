import React, { Component } from "react";

import { TabListItem } from "./styled-rebass";

export interface ITabProps {
  label: string;
  onClick: any;
  activeTab: string;
}

class Tab extends Component<ITabProps, object> {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label }
    } = this;

    // let className = "tab-list-item";

    // if (activeTab === label) {
    //   className += " tab-list-active";
    // }

    return (
      <TabListItem
        activeTab={activeTab}
        label={label}
        active={activeTab === label}
        onClick={onClick}
      >
        {label}
      </TabListItem>
    );
  }
}

export default Tab;
