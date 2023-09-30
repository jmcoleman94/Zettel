import { Database } from 'better-sqlite3';

export type Workspace = {
  id?: number;
  directory: string;
  created: Date;
  active: boolean;
  indexed?: Date;
};

export class WorkspaceContext {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  createWorkspace(directory: string): Workspace {
    const insert = this.db.prepare(
      'INSERT INTO WORKSPACE (DIRECTORY) VALUES (@directory)',
    );
    const result = insert.run({ directory });

    return this.getWorkspace(result.lastInsertRowid);
  }

  getActiveWorkspace(): Workspace {
    const fetch = this.db.prepare(
      'SELECT * FROM WORKSPACE WHERE ACTIVE = TRUE',
    );
    return fetch.get() as Workspace;
  }

  getWorkspace(id: number | bigint): Workspace {
    const fetch = this.db.prepare('SELECT * FROM WORKSPACE WHERE ID = @id');
    return fetch.get({ id }) as Workspace;
  }

  getWorkspaces(): Workspace[] {
    const fetch = this.db.prepare('SELECT * FROM WORKSPACE');
    return fetch.all() as Workspace[];
  }

  switchActiveWorkspace(id: number | bigint) {
    this.db.exec('UPDATE WORKSPACE SET ACTIVE = FALSE WHERE ACTIVE = TRUE');

    const update = this.db.prepare(
      'UPDATE WORKSPACE SET ACTIVE = TRUE WHERE ID = @id',
    );
    update.run({ id });

    return this.getWorkspace(id);
  }
}
