const GenericController = require('./GenericController');

const defineRoutes = (app, apiDefinitions) => {

     console.log('Defining api routes');

     apiDefinitions.resources.forEach(resource => {
        
        const uri = "/" + resource.name;
        const uriId = "/" + resource.name + "/:id";

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

exports.build = (app, apiDefinitions) => {

    defineRoutes(app, apiDefinitions);

}