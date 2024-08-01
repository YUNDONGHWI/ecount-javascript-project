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

module.exports = {
    test,
};
