const AccountRequest = require("./model/AccountRequest");
const service = require("./service");

async function test(req, res) {
    try {
        const data = await service.getTest();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error " });
    }
}


// DB 모든 레코드 불러오기
async function getAllData(req, res) {
    try {
        const data = await service.getAllData();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error " });
    }
}

// 새로운 수입/지출 데이터 저장
async function createData(req, res) {
    try {
        // to DTO
        const requestData = new AccountRequest(
            req.body.category,
            req.body.isIncome,
            req.body.content,
            req.body.amount,
        );
        
        // 데이터 저장
        const newData = await service.createData(requestData);
        res.status(201).json(newData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error " });
    } 
}

module.exports = {
    test,
    getAllData,
    createData,
};
