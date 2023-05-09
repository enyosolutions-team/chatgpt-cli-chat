// Remember to set type: module in package.json or use .mjs extension
import { join } from 'node:path';

const mydb = null;
async function init(db: any) {
  if (db) {
    return db;
  }
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  // db.json file path
  const file = join(__dirname, '../../db/', 'db.json');

  // Configure lowdb to write data to JSON file
  const adapter = new JSONFile(file);
  const defaultData = {
    embeds: [],
    prompts: [],
    history: {},
    fineTunes: {},
  };
  db = new Low(adapter, defaultData);

  // Read data from JSON file, this will set db.data content
  // If JSON file doesn't exist, defaultData is used instead
  db.read();
  return db;
}

export default () => init(mydb);
