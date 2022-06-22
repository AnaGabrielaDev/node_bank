const { Router } = require('express');
const { accountRoutes } = require('./account.routes');
const { operationsRoutes } = require('./operations.routes');
const { statementRoutes } = require('./statement.routes');
const routes = Router();

routes.use(operationsRoutes);
routes.use(statementRoutes);
routes.use(accountRoutes);

module.exports = { routes };