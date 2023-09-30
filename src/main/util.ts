/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  let result;
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    result = url.href;
  } else {
    result = `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  }
  console.log(`resolving path ${result}`);
  return result;
}
