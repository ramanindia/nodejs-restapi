import { pool } from '../db/connection';
// utils/common.ts
export const utilDatabase = {
  checkAllReadyExits: async (
      tableName: string,
      tableFieldName: string,
      tableFieldfieldValue: any,
      editIdfieldName: any = null,
      editIdfieldValue: any = null
    ): Promise<boolean> => 
      {
        const values: any[] = [tableFieldfieldValue];
        let query = `SELECT COUNT(*) AS totalResult FROM \`${tableName}\` WHERE ${tableFieldName} = ? AND status != 2`;
        // Optional exclusion (e.g. ignore current record when updating)
        if (editIdfieldName && editIdfieldValue !== null) {
          query += ` AND ${editIdfieldName} != ?`;
          values.push(editIdfieldValue);
        }
        const [rows]: any = await pool.query(query, values);
        const total = rows[0]?.totalResult || 0;
        return total > 0; // true if record exists
    }
};

