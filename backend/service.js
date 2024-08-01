const pool = require("./db");
const AccountBook = require("./model");

// 테스트
async function getTest() {
    const client = await pool.connect();

    try {
        const result = await client.query("SELECT * FROM account_book LIMIT 1");
        return result.rows[0];
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}

// DB 모든 데이터 가져오기
async function getAllData() {
    const client = await pool.connect();

    try {
        const result = await client.query("SELECT * FROM account_book");
        return result.rows;

        

    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}



module.exports = {
    getTest,
    getAllData,
};
