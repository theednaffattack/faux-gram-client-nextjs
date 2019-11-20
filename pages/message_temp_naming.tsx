import React from "react";

import Layout from "../src/modules/site-layout/layout";
import GetOnlyThreads from "../src/components/get-only-threads_2";

const GetOnlyThreadsPage = () => (
  <Layout title="Messages">
    <GetOnlyThreads />
  </Layout>
);

export default GetOnlyThreadsPage;
