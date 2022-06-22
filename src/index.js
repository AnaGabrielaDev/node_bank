const express = require("express");
const { v4:uuid } = require('uuid');
const app = express();

const costumers = [];
app.use(express.json());

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

function verifyIfExists(req, res, next) {
    const { cpf } = req.headers;

    const costumerObj = costumers.find((costumer) => costumer.cpf === cpf);

    if(!costumerObj) return res.status(400).json({error: "Costumers not found"});

    req.costumer = costumerObj;
    return next();
}

app.use(verifyIfExists);

app.get("/statement", (req, res) => {
    const { costumer } = req;

    return res.send(costumer.statement)
});

app.post("/deposit", (req, res) => {
    const { costumer } = req;
    const { amount, description } = req.body;

    const statementOperation = {
        amount, 
        description,
        created_at: new Date(),
        type: 'credit'
    };
    
    costumer.statement.push(statementOperation);

    return res.send(201).send();
});

app.listen(3333);