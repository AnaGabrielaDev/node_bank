const { costumers } = require("../db/costumers");

function verifyIfExists(req, res, next) {
    const { cpf } = req.headers;
    
    const costumerObj = costumers.find((costumer) => costumer.cpf === cpf);
    
    if(!costumerObj) return res.status(400).json({error: "Costumers not found"});
    
    req.costumer = costumerObj;
    return next();
}

module.exports = { verifyIfExists }