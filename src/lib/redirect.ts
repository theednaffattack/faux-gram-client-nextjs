import Router from "next/router";
import { ParsedUrlQueryInput } from "querystring";

export default (context: any, target: string, query?: ParsedUrlQueryInput) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace({
      pathname: target,
      query
    }); // target
  }
};
