const pool = require('./db');

async function getTest() {
    const client = await pool.connect();

    try {
        const result = await client.query('SELECT * FROM account_book LIMIT 1');
        return result.rows[0];
    } catch(err) {
        console.error('Error executing query:', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {
    getTest,
};