const pool = require("./db");
const MonthResponse = require("./model/MonthResponse");
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
        const result = await client.query("SELECT * FROM account_book ORDER BY created_dttm DESC");
        return result.rows;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}

// 수입/지출 데이터 입력하기
async function createData(requestData) {
    const client = await pool.connect();

    try {
        const insertQuery = `
            INSERT INTO account_book (category, is_income, content, amount)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const values = [
            requestData.getCategory(),
            requestData.getIsIncome(),
            requestData.getContent(),
            requestData.getAmount(),
        ];

        const result = await client.query(insertQuery, values);

        return result.rows[0];
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}

// 수입데이터만 불러오기
async function getIncome() {
    const client = await pool.connect();

    try {
        const result = await client.query(
            "SELECT * FROM account_book WHERE is_income = true ORDER BY created_dttm DESC"
        );
        return result.rows;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}

// 지출데이터만 불러오기
async function getExpenditure() {
    const client = await pool.connect();

    try {
        const result = await client.query(
            "SELECT * FROM account_book WHERE is_income = false ORDER BY created_dttm DESC"
        );
        return result.rows;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}

// 카테고리 항목별 데이터 불러오기
async function getByCategory(category) {
    const client = await pool.connect();

    try {
        const result = await client.query("SELECT * FROM account_book WHERE category = $1", [
            category,
        ]);
        return result.rows;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    } finally {
        client.release();
    }
}

// 월별 항목별 합산 데이터 불러오기
async function getByMonth(year, month) {
    const client = await pool.connect();

    try {
        const monthQuery = `
            SELECT category, is_income, SUM(amount) AS total_amount
            FROM account_book
            WHERE EXTRACT(YEAR FROM created_dttm) = $1
              AND EXTRACT(MONTH FROM created_dttm) = $2
            GROUP BY category, is_income
            ORDER BY category;
        `;

        const values = [year, month];

        const result = await client.query(monthQuery, values);
        let datas = result.rows;
        let totalIncome = 0;
        let totalExpense = 0;
        let flexIncome = 0;
        let fixedIncome = 0;
        let flexExpense = 0;
        let fixedExpense = 0;

        const fixedExpenseCategories = ["통신비", "교육비", "주거비", "세금", "교통비"];
        const flexExpenseCategories = ["식비", "여가비", "의료비", "기타"];

        result.rows.forEach((row) => {
            if (fixedExpenseCategories.includes(row.category) && row.is_income === false) {
                // 고정비용
                fixedExpense += Number(row.total_amount);
            } else if (flexExpenseCategories.includes(row.category) && row.is_income === false) {
                // 유동비용
                flexExpense += Number(row.total_amount);
            } else if (row.category === "상여급" && row.is_income === true) {
                // 유동수익
                flexIncome += Number(row.total_amount);
            } else if (row.category === "월급" && row.is_income === true) {
                // 고정수익
                fixedIncome += Number(row.total_amount);
            }
        });

        totalIncome = flexIncome + fixedIncome;
        totalExpense = flexExpense + fixedExpense;

        let monthResponse = new MonthResponse(
            totalIncome,
            totalExpense,
            flexIncome,
            fixedIncome,
            flexExpense,
            fixedExpense,
            datas
        );
        console.log(monthResponse);
        return monthResponse;
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
    createData,
    getIncome,
    getExpenditure,
    getByCategory,
    getByMonth,
};
