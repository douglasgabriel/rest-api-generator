const GenericController = require('./GenericController');

/**
 * Setting the routes of the resources 
 * 
 * @param {JSON} app - the express app
 * @param {JSON} apiDefinitions  - the definitions of the api to generate
 * 
 * @author douglasgabriel
 */
const defineRoutes = (app, apiDefinitions) => {

     console.log('Defining api routes');

     apiDefinitions.resources.forEach(resource => {
        
        const uri = "/" + resource.name;

        console.log(' - Defining route:', uri);

        const genericController = new GenericController(resource);

        const getFunction = genericController.get.bind(genericController);
        const postFunction = genericController.post.bind(genericController);

        app.route(uri)
            .get(getFunction)
            .post(postFunction);
     });

}

/**
 * Builds the Rest API.
 */
exports.build = (app, apiDefinitions) => {

    defineRoutes(app, apiDefinitions);

}