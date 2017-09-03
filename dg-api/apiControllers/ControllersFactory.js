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
        
        const baseUri = apiDefinitions.baseUri || "/";

        const uri = baseUri + resource.name;
        const uriId = baseUri + resource.name + "/:id";

        console.log(' - Defining route:', uri);
        console.log(' - Defining route:', uriId);

        const genericController = new GenericController(resource);

        const getFunction = genericController.get.bind(genericController);
        const getByIdFunction = genericController.getById.bind(genericController);
        const postFunction = genericController.post.bind(genericController);
        const putFunction = genericController.put.bind(genericController);
        const deleteFunction = genericController.delete.bind(genericController);

        //Routes with id
        app.route(uriId)
            .get(getByIdFunction)
            .delete(deleteFunction)
            .put(putFunction);
        
        app.route(uri) 
            .get(getFunction)
            .put(putFunction)
            .post(postFunction);
     });

}

/**
 * Builds the Rest API.
 */
exports.build = (app, apiDefinitions) => {

    defineRoutes(app, apiDefinitions);

}