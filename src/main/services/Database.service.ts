import { db, migrate } from './db/database';
import { WorkspaceContext } from './db/workspace';
import { TodoContext } from './db/todo';

export { TODO } from './db/todo';
export { Workspace } from './db/workspace';

export class DatabaseContext {
  private workspace: WorkspaceContext;

  private todo: TodoContext;

  constructor() {
    this.workspace = new WorkspaceContext(db);
    this.todo = new TodoContext(db);
  }

  Workspace(): WorkspaceContext {
    return this.workspace;
  }

  ToDo(): TodoContext {
    return this.todo;
  }

  migrateDb() {
    migrate();
  }

  index() {

  }
}
