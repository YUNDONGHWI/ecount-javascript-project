const service = require('./service');

async function test(req, res) {
    try {
        const data = await service.getTest();
        console.log(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Error ' + err.message);
    }
}

module.exports = {
    test,
};