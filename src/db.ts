import { Dexie, Table } from 'dexie';

export interface Operation {
  id?: number;
  label?: string
  type: "query" | "mutation" | "subscription";
  name: string;
  content: string;
  pathname: string
  url?: string;
  example: boolean;
  created: string;
}

export class CustomDexie extends Dexie {
  operations!: Table<Operation>;

  constructor() {
    super('saleor:operations');
    this.version(1).stores({
      operations: '++id, name, pathname, example'
    });
  }
}
