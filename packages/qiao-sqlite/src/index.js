// db
import { createDB } from './_db.js';

// table
import { createTable, dropTable, showTables } from './_table.js';

// data
import { insertData, deleteData, modifyData, selectData } from './_data.js';

/**
 * db
 * @param {*} databaseName
 */
export default async (databaseName) => {
  const obj = {};

  // db
  obj.db = createDB(databaseName);

  // table
  obj.createTable = async (sql) => {
    try {
      await createTable(obj.db, sql);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  obj.dropTable = async (tableName) => {
    try {
      await dropTable(obj.db, tableName);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  obj.showTables = async () => {
    try {
      return await showTables(obj.db);
    } catch (error) {
      console.log(error);
    }
  };

  // data
  obj.insertData = async (sql, params) => {
    try {
      await insertData(obj.db, sql, params);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  obj.deleteData = async (sql, params) => {
    try {
      await deleteData(obj.db, sql, params);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  obj.modifyData = async (sql, params) => {
    try {
      await modifyData(obj.db, sql, params);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  obj.selectData = async (sql, params) => {
    try {
      return await selectData(obj.db, sql, params);
    } catch (error) {
      console.log(error);
    }
  };

  return obj;
};
