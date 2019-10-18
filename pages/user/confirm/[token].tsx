import React from "react";
import Router from "next/router";

// import Layout from "../../../src/components/Layout";
// import { IUserPageProps } from "../../../src/modules/auth/types";
import { ConfirmUserComponent } from "../../../src/components/generated/apollo-graphql";
import { NextPage } from "next";
import { TBProps } from "pages/b";

interface IConfirmProps extends TBProps {
  token: string | string[];
}

// @ts-ignore
const Confirm: NextPage<IConfirmProps> = ({ pathname, query, token }) => {
  let preppedToken: string;
  if (token.constructor === Array) {
    preppedToken = token[0];
  }
  if (typeof token === "string") {
    preppedToken = token;
  }
  return (
    <ConfirmUserComponent>
      {confirmUser => {
        confirmUser({
          variables: { token: preppedToken }
        })
          .catch(error => console.error({ error }))
          // @ts-ignore
          .then(data => {
            Router.push("/welcome");
          });
        return <div>hello</div>;
      }}
    </ConfirmUserComponent>
  );
};

Confirm.getInitialProps = async ({ pathname, query }) => {
  const { token } = query;

  return { pathname, query, token };
};

export default Confirm;

// interface IConfirmPageProps extends IUserPageProps {
//   type?: any;
//   props?: any;
//   key?: any;
// }

// interface IConfirmProps {
//   token: string;
// }

// class Confirm extends React.PureComponent<IConfirmProps, object> {
//   render() {
//     let { token } = this.props;
//     if (token) {
//       return (
//         <ConfirmUserComponent>
//           {confirmUser => {
//             confirmUser({
//               variables: { token }
//             })
//               .catch(error => console.error({ error }))
//               // @ts-ignore
//               .then(data => {
//                 Router.push("/welcome");
//               });
//             return <div>hello</div>;
//           }}
//         </ConfirmUserComponent>
//       );
//     }
//     return <div>A Real error, this should be unreachable</div>;
//   }
// }
