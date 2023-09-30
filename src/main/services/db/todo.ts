import {Database} from 'better-sqlite3';
import { promisify } from 'util';

export type TODO = {
  id?: number;
  title: string;
  date: string;
  status: number;
};

export class TodoContext {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  insertTODO(todo: TODO) {

  }

  updateTODO(todo: TODO) {

  }

  deleteTODO(id: number) {

  }

  getAllTODO(): Promise<TODO[]> {
    return new Promise<TODO[]>((resolve) => {
      resolve([]);
    });
  }

  getOneTODO(id: number) : TODO {
    return {title:'', date:'', status:0}
  }
}
