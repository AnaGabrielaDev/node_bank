const express = require("express");
const { v4:uuid } = require('uuid');
const app = express();

const costumers = [];
app.use(express.json());


function verifyIfExists(req, res, next) {
    const { cpf } = req.headers;

    const costumerObj = costumers.find((costumer) => costumer.cpf === cpf);

    if(!costumerObj) return res.status(400).json({error: "Costumers not found"});

    req.costumer = costumerObj;
    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit') return acc + operation.amount;
        else return acc - operation.amount;
    }, 0);

    return balance;
}

app.post("/account",(req, res) => {
    const { cpf, name } = req.body;

    const verifyIfAlreadyExists = costumers.some((costumers) => costumers.cpf === cpf);

    if(verifyIfAlreadyExists) return res.json({error: "Costumers already exists"});

    costumers.push({
        id: uuid(),
        cpf,
        name,
        statement: []
    });

    return res.status(200).send(costumers);

});

app.use(verifyIfExists);

app.get("/statement", (req, res) => {
    const { costumer } = req;

    return res.send(costumer.statement)
});

app.post("/deposit", (req, res) => {
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

app.post("/withdraw", (req, res) => {
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

app.get("/statement/date", (req, res) => {
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

app.patch("/account", (req, res) => {
    const { costumer } = req;
    const { name } = req.body;
    
    costumer.name = name;

    return res.status(200).send();
});

app.get("/account", (req, res) => {
    const { costumer } = req;

    return res.status(200).json(costumer);
});

app.delete("/account", (req, res) => {
    const { costumer } = req;

    costumers.splice(costumer, 1);

    return res.status(204).send();
});

app.get("/balance", (req, res) => {
    const { costumer } = req;

    const balance = getBalance(costumer.statement);

    return res.json(balance);
});

app.listen(3333);