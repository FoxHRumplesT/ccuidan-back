import mysql from 'mysql2/promise';
import { configMySql } from '@config/database';

export const rowsOrEmpty = (rows: any[]): any => {
  if (!rows) return [];
  return rows;
}

export const query = async <T extends any>(sql: string): Promise<T> => {
  const connection = await mysql.createConnection(configMySql.db);
  const [r] = await connection.execute(sql);
  console.log("🚀 ~ file: db.ts ~ line 12 ~ query ~ r", r)
  return [] as T;
}