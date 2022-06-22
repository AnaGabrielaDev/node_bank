const { Router } = require('express');
const { verifyIfExists } = require('../middlewares/verifyIfExists');
const statementRoutes = Router();

statementRoutes.get("/statement", verifyIfExists, (req, res) => {
    const { costumer } = req;

    return res.send(costumer.statement)
});

statementRoutes.get("/statement/date", verifyIfExists, (req, res) => {
    const { costumer } = req;
    const { date } = req.query;
    
    const dateFormat = new Date(date + " 00:00");

    const statement = costumer.statement.filter(
        (statement) => 
            statement.created_at.toDateString() ===
            dateFormat.toDateString()
    );

    if(statement.length === 0) return res.status(400).json({error: "There is no movement that day"});

    return res.json(statement);
});

module.exports = { statementRoutes };