import React from "react";
import { isBrowser } from "../src/lib/isBrowser";

let initialState = isBrowser
  ? window.localStorage.getItem("myValueInLocalStorage")
  : "";

const Storage = () => {
  // const [value, setValue] = React.useState(
  //   window.localStorage.getItem("myValueInLocalStorage") || ""
  // );
  const [value, setValue] = React.useState(initialState);
  React.useEffect(() => {
    window.localStorage.setItem("myValueInLocalStorage", value || "");
  }, [value]);
  const onChange = (event: any) => setValue(event.target.value);
  return (
    <div>
      <h1>Hello React with Local Storage!</h1>
      <input value={value || ""} type="text" onChange={onChange} />
      <p>{value}</p>
    </div>
  );
};
export default Storage;
