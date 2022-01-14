import React from "react";
import { Link } from "gatsby";

import * as styles from "./post.module.css";

export const Post = ({ node, query }) => {
  const date = new Date(node.date);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  let isNew = false;

  if (date > oneMonthAgo) {
    isNew = true;
  }

  let formattedDate;
  if (node.date) {
    const dateArr = node.date.split(" ");
    dateArr.pop();
    dateArr[0] = dateArr[0].slice(0, 3);
    formattedDate = dateArr.join(" ").slice(0, -1);
  }

  const getTitle = (title, query) => {
    if (query) {
      const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      const highlightStart = title.search(re);

      if (highlightStart !== -1) {
        const highlightEnd = highlightStart + query.length;

        return (
          <h3>
            {title.slice(0, highlightStart)}
            {title.slice(highlightStart, highlightEnd)}
            {title.slice(highlightEnd)}
          </h3>
        );
      }
      return <h3>{title}</h3>;
    }
    return <h3>{title}</h3>;
  };

  return (
    <Link
      to={node.slug}
      key={node.id}
      className={isNew ? `${styles.link} ${styles.linkNew}` : styles.link}
    >
      {getTitle(node.title, query)}
      <div>{formattedDate && <time>{formattedDate}</time>}</div>
    </Link>
  );
};
