export const getSimplifiedPosts = (posts) => {
  // flatten posts to a simplified structure for pages
  return posts.map((post) => ({
    id: post.id,
    date: post.frontmatter.date,
    slug: post.fields.slug,
    tags: post.frontmatter.tags,
    category: post.frontmatter.category,
    title: post.frontmatter.title,
  }));
};

export const getCategoriesFromPosts = (posts) => {
  // this sorts the array and uses a set to find unique categories
  posts.sort((a, b) => a.category.localeCompare(b.category));
  const categories = new Set();

  posts.forEach((post) => {
    categories.add(post.category);
  });

  return [...categories];
};
