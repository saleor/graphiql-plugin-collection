import { CustomDexie } from "./db.js";

export interface CollectionPluginProps {
  operation: string;
  operationName: string;
  handleEditQuery: (query: string) => void;
  db: CustomDexie;
}