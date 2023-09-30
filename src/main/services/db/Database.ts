import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import userDataPath from '../UserData.service';

const dbPath = userDataPath('database.db');

export const db = Database(dbPath, { verbose: console.log });

function startRevision(revisionNo: number, description: string) {
  const stm = db.prepare(
    'INSERT INTO MIGRATION (REVISION, DESCRIPTION, STARTED)' +
      'VALUES (@revisionNo, @description, CURRENT_TIMESTAMP)',
  );

  stm.run({ revisionNo, description });
}

function completeRevision(revisionNo: number) {
  const stm = db.prepare(
    'UPDATE MIGRATION SET COMPLETED = CURRENT_TIMESTAMP WHERE REVISION = @revisionNo',
  );

  stm.run({ revisionNo });
}

function getLastRevision(): number {
  type revision = { LASTREVISION: number };
  const stm = db.prepare(
    'SELECT MAX(REVISION) LASTREVISION FROM (SELECT REVISION FROM MIGRATION UNION SELECT 0)',
  );
  return (stm.get() as revision).LASTREVISION;
}

function dbExecFile(revisionPath: string) {
  db.exec(fs.readFileSync(revisionPath, 'utf8'));
}

function getRevisionPath(revision: number): string {
  return path.join(__dirname, `../../../db/revisions/${revision}.sql`);
}

export function migrate() {
  dbExecFile(path.join(__dirname, '../../../db/init.sql'));

  let nextRevision = getLastRevision() + 1;
  console.log(`attempting migration from revision ${nextRevision}`);
  while (fs.existsSync(getRevisionPath(nextRevision))) {
    console.log(`executing revision ${nextRevision}`);
    startRevision(nextRevision, 'revision');
    dbExecFile(getRevisionPath(nextRevision));
    completeRevision(nextRevision);
    nextRevision += 1;
  }
}

export function close() {
  db.close();
}
