import React from "react";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

const NotFound = () => {
  return (
    <Layout>
      <Seo title="404" />
      <article>
        <header>
          <h1>404</h1>
          <p>Page is not valid or under construction.</p>
        </header>
      </article>
    </Layout>
  );
};

export default NotFound;
