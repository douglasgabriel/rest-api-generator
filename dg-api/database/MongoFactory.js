const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates database schema from the schema definition
 * pass by parameter
 * 
 * @param {JSON} schemaDefinition - json containing database
 * schema definitions.
 * 
 * @author douglasgabriel
 */
const createModels = (schemaDefinition) => {
    
    schemaDefinition.resources.forEach(resource => {
    
        console.log('Creating new schema on mongo:'
            , resource.name            
        );
    
        let newSchema = {};
    
        Object.getOwnPropertyNames(resource.properties).forEach(prop => {
    
            console.log(' - Adding property:', prop);
    
            resource.properties[prop].type = convertStringToMongoType(resource.properties[prop].type);
    
            newSchema[prop] = resource.properties[prop];
    
        });
    
        mongoSchema = new Schema(newSchema);
    
        module.exports = mongoose.model(resource.name, mongoSchema);
    
    });
    
}
    
/**
* Convert a string to a valid property type
* 
* @param {string} typeString - string to convert
* @author douglasgabriel
*/
const convertStringToMongoType = (typeString) => {
    
    switch (typeString) {
        case 'String' : return String;
        case 'Number': return Number;
        default : throw 'Error while creating mongo schema: Can\'t convert property type to a valid mongo type';
    }
    
}

exports.createSchema = (schemaDefinition) => {

    createModels(schemaDefinition);

}