import {Database} from 'better-sqlite3';

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

  getAllTODO() : TODO[] {
    return [];
  }

  getOneTODO(id: number) : TODO {
    return {title:'', date:'', status:0}
  }
}
