<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80">

  <h1>Apostrophe Blog</h1>
  <p>
    <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20Apostrophe%203-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd">
    </a>
    <a aria-label="Test status" href="https://circleci.com/gh/apostrophecms/blog/tree/main">
      <img alt="" src="https://img.shields.io/circleci/build/github/apostrophecms/blog?labelColor=000000&logo=circleci&style=for-the-badge">
    </a>
    <a aria-label="Join the community on Discord" href="http://chat.apostrophecms.org">
      <img alt="" src="https://img.shields.io/discord/517772094482677790?color=5865f2&label=Join%20the%20Discord&logo=discord&logoColor=fff&labelColor=000&style=for-the-badge&logoWidth=20">
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/blog/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
    </a>
  </p>
</div>

This module bundle helps developers quickly add blog articles to Apostrophe 3 websites. It provides the blog piece type (`@apostrophecms/blog`) as well as a special page type (`@apostrophecms/blog-page`) for editors to create a blog.

## Installation

To install the module, use the command line to run this command in an Apostrophe project's root directory:

```
npm install @apostrophecms/blog
```

## Usage

Configure the blog modules in the `app.js` file:

```javascript
require('apostrophe')({
  shortName: 'my-project',
  modules: {
    // The main blog piece type module
    '@apostrophecms/': {},
    // The blog page module
    '@apostrophecms/blog-page': {}
  }
});
```

### Enable the page type

To enable the blog page type for editor to select, add it to the `@apostrophecms/page` configuration:

```javascript
// modules/@apostrophecms/page/index.js
module.exports = {
  options: {
    types: [
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      // Adding the blog page type
      {
        name: '@apostrophecms/blog-page',
        label: 'Blog Page'
      }
    ]
  }
};
```

**Note:** The index page template (`index.html`), filters template partial (`filters.html`), and show page template (`show.html`) are primarily meant as a starting point for a project. They demonstrate much of the available template data, but developers will almost always want to override them to implement proper styles and layout.

### Filtering by year, month, and day

The default field `releaseDate` sets the date of the blog article. By default, only past articles are displayed to the user. In the Apostrophe UI, all articles are shown to the editors and admin.

The blog page module, `@apostrophecms/blog-page`, provides query filters to refine blog results by year, month, and day. These are primarily used for index page filters (see the `filters.html` file), but can also be used in REST API requests and server-side queries. blogs that span multiple consecutive days are included in results if the query is at least partially included in their date span.

| Filter Name | Description          | Expected Format |
| ----------- | -------------------- | --------------- |
| `year`      | Filter by blog year  | `YYYY`          |
| `month`     | Filter by blog month | `YYYY-MM`       |
| `day`       | Filter by blog day   | `YYYY-MM-DD`    |

### Multiple blog piece types

Sometimes a website needs multiple, distinct types of blogs. If the blog types can be managed together, it might be easiest to [add a new field](https://v3.docs.apostrophecms.org/guide/content-schema.html#using-existing-field-groups) and [query builder](https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#queries-self-query) to customize blog views. But if the blog types should be managed completely separately, it may be better to create separate piece types for each.

Just as we [extend `@apostrophecms/piece-type`](https://v3.docs.apostrophecms.org/guide/pieces.html#creating-a-piece-type) to create a new piece type, we can extend `@apostrophecms/blog` to create a new blog type. The blog type will need its own module directory and UI labels. It can simply inherit the original templates, fields, and other configuration or override them in the blog type's `index.js` file.

A special blog type that has an blog URL field might look like this:

```javascript
// modules/special-blog/index.js
module.exports = {
  extend: '@apostrophecms/blog',
  options: {
    label: 'Special blog',
    pluralLabel: 'Special blogs'
  },
  fields: {
    add: {
      blogUrl: {
        label: 'blog URL',
        type: 'url'
      }
    },
    group: {
      basics: { fields: ['blogUrl'] }
    }
  }
};
```

To display custom blog types on a page, we would need to do the same for the blog page module. All custom modules would need to be instantiated in the `app.js` file like any other module.

```javascript
// modules/special-blog-page/index.js
module.exports = {
  extend: '@apostrophecms/blog-page'
};
```

Do this as many times as you need custom blog types. Adding filtering and new fields to the base blog module is usually enough for most use cases, but organizations with more complex blog needs will find this strategy helpful.
