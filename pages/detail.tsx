import React from "react";

import { findData } from "../src/utils/sample-api";
import { getLayout } from "../src/modules/site-layout/layout";
import ListDetail from "../src/components/ListDetail";
import { MyContext } from "../types/types";

type Props = {
  item?: any;
  errors?: string;
  referer: string;
};

class InitialPropsDetail extends React.Component<Props> {
  static title = "Detail";
  static getLayout = getLayout;
  static getInitialProps = async ({ query, referer }: MyContext) => {
    console.log({ referer });
    try {
      const { id } = query;
      const item = await findData(Array.isArray(id) ? id[0] : id);
      return { item, referer };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors, referer } = this.props;

    if (errors) {
      return (
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      );
    }

    return (
      <>
        <p>Referer: {referer}</p>
        {item && <ListDetail item={item} />}
      </>
    );
  }
}

export default InitialPropsDetail;
