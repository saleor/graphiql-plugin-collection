import { Button, useEditorContext } from '@graphiql/react';
import { useMemo, useRef } from 'react';
import { DateTime } from 'luxon';

import type { GraphiQLPlugin } from '@graphiql/react';
import "./collection-plugin-styles.css"

interface CollectionPluginProps {
  operation: string;
  operationName: string;
  handleEditQuery: (query: string) => void;
}

import { db } from './db.js';
import { useLiveQuery } from 'dexie-react-hooks';
import OperationItem from './Operation.js';
import { CollectionPluginIcon } from './CollectionPluginIcon.js';

const CollectionPlugin = ({ operation, operationName, handleEditQuery }: CollectionPluginProps) => {
  const { pathname } = window.location;
  const { setOperationName } = useEditorContext({ nonNull: true });

  const operations = useLiveQuery(
    () => db.operations.where("pathname").equals(pathname).and((op) => !op.example).toArray()
  );

  const examples = useLiveQuery(
    () => db.operations.where("pathname").equals(pathname).and((op) => op.example).toArray()
  );

  function getOperationType(s: string): "query" | "mutation" | "subscription" {
    if (s.startsWith('{') || s.startsWith('query')) {
      return 'query';
    } else if (s.startsWith('mutation')) {
      return 'mutation';
    } else if (s.startsWith('subscription')) {
      return 'subscription';
    } else {
      return 'query'
    }
  }

  const type = getOperationType(operation.trim())

  const save = () => {
    const created = DateTime.now().toString();
    const newSave = {
      type,
      name: operationName ?? '<untitled>',
      content: operation, 
      example: false,
      pathname,
      created,
    };
    if (db.operations) {
      db.operations.add(newSave);
    }
    setOperationName(operationName ?? 'untitled');
  };


  return (
    <div className="collection-plugin-container">
      <div className="flex justify-end">
        <Button type="button" onClick={save} className="">
          Save
        </Button>
      </div>

      <div className="collection-plugin-header">Saved Operations</div>
      <ul className="collection-plugin-list">
        {operations?.map((operation, idx) => (
          <li key={operation.id} className='collection-plugin-item'>
            <button onClick={(event) => {
              event.preventDefault();
              handleEditQuery(operation.content)
            }}
              className='graphiql-un-styled collection-plugin-button '
            >
              <OperationItem {...operation} />
            </button>
          </li>
        ))}
      </ul>

      <div className="collection-plugin-header">Examples</div>
      <ul className="collection-plugin-list">
        {examples?.map((operation) => (
          <li key={operation.id} className='collection-plugin-item'>
            <button onClick={(event) => {
              event.preventDefault();
              handleEditQuery(operation.content)
            }}
              key={operation.id}
              className='graphiql-un-styled collection-plugin-button '
            >
              <OperationItem {...operation} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
