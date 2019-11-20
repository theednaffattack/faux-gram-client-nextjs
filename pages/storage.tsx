import React from "react";

import { isBrowser } from "../src/lib/isBrowser";
import Layout, { getLayout } from "../src/modules/site-layout/layout";

interface IStorage {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

let initialState = isBrowser
  ? window.localStorage.getItem("myValueInLocalStorage")
  : "";

const Storage: IStorage = () => {
  // const [value, setValue] = React.useState(
  //   window.localStorage.getItem("myValueInLocalStorage") || ""
  // );
  const [value, setValue] = React.useState(initialState);
  React.useEffect(() => {
    window.localStorage.setItem("myValueInLocalStorage", value || "");
  }, [value]);
  const onChange = (event: any) => setValue(event.target.value);
  return (
    <Layout title="Local Storage Logout">
      <h1>Hello React with Local Storage!</h1>
      <input value={value || ""} type="text" onChange={onChange} />
      <p>{value}</p>
    </Layout>
  );
};

Storage.getLayout = getLayout;
Storage.title = "Storage";

export default Storage;
