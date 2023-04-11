# GraphiQL Plugin Collection

This plugin allows you to manage collections of operations (queries or mutations) in GraphiQL. You can save your frequently used operations into collections and quickly access them from the GraphiQL interface.

## Features

 - [x] Save queries and mutations to collections
 - [x] Fetch pre-defined examples from external locations 
 - [ ] Create collections to group your operations.
 - [ ] Quickly access your collections from the sidebar in GraphiQL.

## Installation

Install the package in your project:

```sh
pnpm add @saleor/graphiql-plugin-collection
```

```tsx
import GraphiQL from 'graphiql';
import { CollectionManagerPlugin } from '@saleor/graphiql-plugin-collection';

export const YourComponent = ({}) => {
  const {
    editorContent,
    setQuery: handleEditQuery,
  } = useGraphQLEditorContent(defaultQuery);

  const { query: operation, operationName } = editorContent;

  const CollectionPlugin = useCollectionPlugin({ operation, operationName, handleEditQuery, db });

  return (
    <GraphiQL
      ...
      plugins={[CollectionPlugin]}
      ...
    />
  )
}
```

## Contributing

If you find a bug or would like to contribute to this plugin, please open an issue or pull request on the GitHub repository.