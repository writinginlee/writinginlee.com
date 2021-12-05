# writinginlee.com

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This is my personal website built using Gatsby 4.

## Project Structure

```
.
├── node_modules
├── src
    ├── components
    ├── icons
    ├── images
    ├── pages
    ├── styles
    ├── templates
    └── utils
├── .gitignore
├── .prettierignore
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── LICENSE
├── package.json
├── README.md
└── yarn.lock
```

## `/src`

1. **`/components`**: Contains the React components used for building out the pages.

2. **`/icons`**: Contains all custom SVG icons and the logo.

3. **`/pages`**: Contains pages for the site that are not created through templates.

4. **`/styles`**: Contains globals styles. These are `variables.css`, used to define shared CSS custom properties, `reset.css`, which contains a CSS reset based on Chakra, and `global.css`, which includes a tiny set of global styles.

5. **`/templates`**: Contains page templates used by the `createPages` API.

6. **`/utils`**: Utility functions, e.g. custom hooks used for handling search and pagination.
