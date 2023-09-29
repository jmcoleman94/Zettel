import {Database} from 'better-sqlite3';

export type Workspace = {
  id?: number,
  directory: string,
  created?: Date,
  indexed?: Date
};

export class WorkspaceContext {

  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  createWorkspace(directory: string) : Workspace {

    const insert = this.db.prepare('INSERT INTO WORKSPACE (DIRECTORY) VALUES (@directory)')
    let result = insert.run({ directory })

    const fetch = this.db.prepare('SELECT * FROM WORKSPACE WHERE ID = @rowId')
    let workspace = fetch.get({ rowId: result.lastInsertRowid }) as Workspace

    return workspace
  }
}
