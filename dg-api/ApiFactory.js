const fs = require('fs');
const apiDefinitions = JSON.parse(fs.readFileSync('./api.json', 'utf8'));

const mongoFactory = require('./database/MongoFactory');
const controllersFactory = require('./apiControllers/ControllersFactory');

/**
 * Builds the api
 * 
 * @author douglasgabriel
 */
exports.build = (app) => {
    
    mongoFactory.createSchema(apiDefinitions);
    controllersFactory.build(app, apiDefinitions);
    
}