import snowflake from 'snowflake-sdk';
import * as fs from 'fs';

interface QueryResult {
  rows: Record<string, unknown>[];
}

function getConnection(): snowflake.Connection {
  const tokenPath = '/snowflake/session/token';
  const isSpcs = fs.existsSync(tokenPath);

  if (isSpcs) {
    const token = fs.readFileSync(tokenPath, 'utf-8').trim();
    return snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT || '',
      host: process.env.SNOWFLAKE_HOST || '',
      authenticator: 'OAUTH',
      token: token,
      database: 'EPOWER_VPP',
      schema: 'VPP_DATA',
      warehouse: 'EPOWER_COMPUTE',
    });
  } else {
    return snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT || '',
      username: process.env.SNOWFLAKE_USER || '',
      password: process.env.SNOWFLAKE_PASSWORD || '',
      database: 'EPOWER_VPP',
      schema: 'VPP_DATA',
      warehouse: process.env.SNOWFLAKE_WAREHOUSE || 'EPOWER_COMPUTE',
    });
  }
}

export async function executeQuery(sql: string, binds?: unknown[]): Promise<QueryResult> {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    connection.connect((err) => {
      if (err) {
        reject(new Error(`Connection failed: ${err.message}`));
        return;
      }

      connection.execute({
        sqlText: sql,
        binds: binds as snowflake.Binds,
        complete: (err, _stmt, rows) => {
          connection.destroy(() => {});
          if (err) {
            reject(new Error(`Query failed: ${err.message}`));
            return;
          }
          // Normalize column names to lowercase for frontend consistency
          const normalized = (rows || []).map((row) => {
            const out: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
              out[key.toLowerCase()] = value;
            }
            return out;
          });
          resolve({ rows: normalized });
        },
      });
    });
  });
}
