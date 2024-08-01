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

module.exports = {
    test,
    getAllData,
};
