const { Router } = require('express');
const { v4:uuid } = require('uuid');
const { costumers } = require('../db/costumers');
const { verifyIfExists } = require('../middlewares/verifyIfExists');
const accountRoutes = Router();

accountRoutes.post("/account", (req, res) => {
    const { cpf, name } = req.body;

    const verifyIfAlreadyExists = costumers.some((costumer) => costumer.cpf === cpf);
    if(verifyIfAlreadyExists) return res.json({error: "Costumers already exists"});

    costumers.push({
        id: uuid(),
        cpf,
        name,
        statement: []
    });

    return res.status(200).send(costumers);
});

accountRoutes.patch("/account", verifyIfExists, (req, res) => {
    const { costumer } = req;
    const { name } = req.body;
    
    costumer.name = name;

    return res.status(200).send();
});

accountRoutes.get("/account", verifyIfExists, (req, res) => {
    const { costumer } = req;

    return res.status(200).json(costumer);
});

accountRoutes.delete("/account", verifyIfExists, (req, res) => {
    const { costumer } = req;

    costumers.splice(costumer, 1);

    return res.status(204).send();
});

module.exports = { accountRoutes };