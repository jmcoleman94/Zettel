import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export type TODO = {
  id?: number;
  title: string;
  date: string;
  status: number;
};

const db = Database(
  path.join(__dirname, '../../../', 'release/app', 'database.db'),
  { verbose: console.log },
);

export function migrate() {
  dbExecFile('../../db/init.sql');

  var nextRevision = getLastRevision() + 1;
  console.log('attempting migration from revision ' + nextRevision)
  while(fs.existsSync(getRevisionPath(nextRevision))) {
    console.log('executing revision ' + nextRevision)
    startRevision(nextRevision, 'revision')
    dbExecFile(getRevisionPath(nextRevision));
    completeRevision(nextRevision)
    nextRevision++;
  }
}

function getRevisionPath(revision: number) : string {
  return './../db/revisions/' + revision + '.sql'
}

function startRevision(revision: number, description: string) {
  const stm = db.prepare('INSERT INTO MIGRATION (REVISION, DESCRIPTION, STARTED)' +
    'VALUES (@revision, @description, CURRENT_TIMESTAMP)');

  stm.run({ revision, description });
}

function completeRevision(revision: number) {
  const stm = db.prepare('UPDATE MIGRATION SET COMPLETED = CURRENT_TIMESTAMP WHERE REVISION = @revision');

  stm.run(revision);
}

function getLastRevision() : number {
  const stm = db.prepare('SELECT MAX(REVISION) FROM MIGRATION')
  return stm.get() as number
}

function dbExecFile(path: string) {
  db.exec(fs.readFileSync(path, 'utf8'));
}

export function index() {

}

export function close() {
  db.close();
}

export function insertTODO(todo: TODO) {
  const stm = db.prepare(
    'INSERT INTO todos (title, date, status) VALUES (@title, @date, @status)',
  );

  stm.run(todo);
}

export function updateTODO(todo: TODO) {
  const { title, status, id } = todo;

  const stm = db.prepare(
    'UPDATE todos SET title = @title, status = @status WHERE id = @id',
  );

  stm.run({ title, status, id });
}

export function deleteTODO(id: number) {
  const stm = db.prepare('DELETE FROM todos WHERE id = @id');

  stm.run({ id });
}

export function getAllTODO() {
  const stm = db.prepare('SELECT * FROM todos');

  return stm.all() as TODO[];
}

export function getOneTODO(id: number) {
  const stm = db.prepare('SELECT * FROM todos where id = @id');

  return stm.get({ id }) as TODO;
}
