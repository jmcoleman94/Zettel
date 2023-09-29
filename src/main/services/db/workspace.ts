import {db} from './Database'

export type Workspace = {
  id?: number,
  directory: string,
  created?: Date,
  indexed?: Date
};

export namespace ZettelDb {

  export function createWorkspace(directory: string) : Workspace {

    const insert = db.prepare('INSERT INTO WORKSPACE (DIRECTORY) VALUES (@directory)')
    let result = insert.run({ directory })

    const fetch = db.prepare('SELECT * FROM WORKSPACE WHERE ID = @rowId')
    let workspace = fetch.get({ rowId: result.lastInsertRowid }) as Workspace

    return workspace
  }
}
