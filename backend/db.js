const { Pool } = require('pg');
/* 
postgres 사용자 database, table 권한 부여 체크해야 함. 
*/
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;