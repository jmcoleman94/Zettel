import path from 'path';

const { app } = require('electron');

export default function userDataPath(...parts: string[]): string {
  return path.join(app.getPath('userData'), 'Zettel', ...parts);
}
