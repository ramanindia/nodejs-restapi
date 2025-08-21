import mysql from 'mysql2/promise';
import  configData from '../assets/config.json';

export const pool = mysql.createPool({
  host: configData.NODE_ENV === 'production' ? configData.ProdDatabase.host : configData.DevDatabase.host,
  user:  configData.NODE_ENV === 'production' ? configData.ProdDatabase.user : configData.DevDatabase.user,
  password:  configData.NODE_ENV === 'production' ? configData.ProdDatabase.password : configData.DevDatabase.password,
  database:  configData.NODE_ENV === 'production' ? configData.ProdDatabase.database : configData.DevDatabase.database,
  debug:  configData.NODE_ENV === 'production' ? configData.ProdDatabase.debug : configData.DevDatabase.debug,
  waitForConnections:  configData.NODE_ENV === 'production' ? configData.ProdDatabase.waitForConnections : configData.DevDatabase.waitForConnections,
  multipleStatements: configData.NODE_ENV === 'production' ? configData.ProdDatabase.multipleStatements : configData.DevDatabase.multipleStatements,
  connectionLimit: configData.NODE_ENV === 'production' ? configData.ProdDatabase.connectionLimit : configData.DevDatabase.connectionLimit,
   maxIdle: configData.NODE_ENV === 'production' ? configData.ProdDatabase.maxIdle : configData.DevDatabase.maxIdle,
  idleTimeout: configData.NODE_ENV === 'production' ? configData.ProdDatabase.idleTimeout : configData.DevDatabase.idleTimeout,
  queueLimit: configData.NODE_ENV === 'production' ? configData.ProdDatabase.queueLimit : configData.DevDatabase.queueLimit,
});
