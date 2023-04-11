import { useMemo, useRef } from 'react';
import type { GraphiQLPlugin } from '@graphiql/react';
import "./index.css";

import { CollectionPluginIcon } from './CollectionPluginIcon.js';
import { CollectionPluginProps } from './types.js';
import { CollectionPlugin } from './CollectionPlugin.js';

export const useCollectionPlugin = (props: CollectionPluginProps) => {
  const propsRef = useRef(props);
  propsRef.current = props;

  return useMemo<GraphiQLPlugin>(
    () => ({
      title: 'Save playground',
      icon: () => <CollectionPluginIcon />,
      content: () => <CollectionPlugin {...propsRef.current} />,
    }),
    []
  );
};

export { CustomDexie } from './db.js';
export type { Operation } from './db.js';
