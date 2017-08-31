const GenericController = require('./GenericController');

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

exports.build = (app, apiDefinitions) => {

    defineRoutes(app, apiDefinitions);

}