import React, { useMemo } from "react";

import { Post } from "./post";

export const Posts = ({ data = [], showYears, query }) => {
  const postsByYear = useMemo(() => {
    const collection = {};

    data.forEach((post) => {
      const year = post.date?.split(", ")[1];

      collection[year] = [...(collection[year] || []), post];
    });

    return collection;
  }, [data]);
  const years = useMemo(
    () => Object.keys(postsByYear).reverse(),
    [postsByYear]
  );

  if (showYears) {
    return years.map((year) => (
      <section key={year}>
        <h2>{year}</h2>
        <div>
          {postsByYear[year].map((node) => (
            <Post key={node.id} node={node} query={query} />
          ))}
        </div>
      </section>
    ));
  } else {
    return (
      <div>
        {data.map((node) => (
          <Post key={node.id} node={node} query={query} />
        ))}
      </div>
    );
  }
};
