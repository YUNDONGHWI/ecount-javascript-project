const { Pool } = require('pg');
/* 
postgres 사용자 database, table 권한 부여 체크해야 함. 
*/
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecount',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;