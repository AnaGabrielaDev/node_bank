const { Router } = require('express');
const { getBalance } = require('../helpers/getBalance');
const { verifyIfExists } = require('../middlewares/verifyIfExists');
const operationsRoutes = Router();

operationsRoutes.post("/deposit", verifyIfExists, (req, res) => {
    const { costumer } = req;
    const { amount, description } = req.body;

    if(amount < 1) return res.status(400).json({error: "deposit must be greater than 1"});

    const statementOperation = {
        amount, 
        description,
        created_at: new Date(),
        type: 'credit'
    };

    costumer.statement.push(statementOperation);

    return res.status(201).send();
});

operationsRoutes.post("/withdraw", verifyIfExists, (req, res) => {
    const { costumer } = req;
    const { amount } = req.body;

    if(amount < 1) return res.status(400).json({error: "withdraw must be greater than 1"});

    const balance = getBalance(costumer.statement);

    if(balance < amount) return res.status(400).json({error: "Insufficient founds!"});

    const statementOperation = {
        amount, 
        created_at: new Date(),
        type: "debit"
    };

    costumer.statement.push(statementOperation);

    return res.status(201).send();
});

operationsRoutes.get("/balance", verifyIfExists, (req, res) => {
    const { costumer } = req;

    const balance = getBalance(costumer.statement);

    return res.json(balance);
});

module.exports = { operationsRoutes };