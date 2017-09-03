'use stict'

const mongoose = require('mongoose');

/**
 * Generic Controller that provides Rest methods for a especific 
 * resource.
 * 
 * @author douglasgabriel
 */
class GenericController {

    /**
     * @param {JSON} resource - resource that will be represent by this instance of the generic controller
     */
    constructor (resource){

        this.resource = resource;
        this.Model = mongoose.model(resource.name);

    }    

    /**
     * Returns a list of the elements on repository.
     * 
     * If there is a parameter on url, then it will be filter by those parameters.
     * 
     * @param {Request} req - object that represents the request of the client.
     * @param {Response} res - object that represents the response that will be served to client.
     * 
     * @author douglasgabriel
     */
    get(req, res){

        const query = req.params || {};

        this.Model.find(query, (err, model) => {

            if (err){
                req.send(err);
            }

            res.json(model);

        });
        
    }
        
    /**
     * Save a new entry on the repository.
     * 
     * @param {Request} req - object that represents the request of the client.
     * @param {Response} res - object that represents the response that will be served to client.
     * 
     * @author douglasgabriel
     */
    post(req, res){

        const model = new this.Model(req.body);

        model.save((err, newModel) => {

            if (err){
                res.send(err);
            }

            res.json({newModel});

        });
        
    }

    /**
     * Udates the element that has the id pass in the 
     * url.
     * 
     * @param {Request} req - object that represents the request of the client.
     * @param {Response} res - object that represents the response that will be served to client.
     * @param {Function} next - callback called if an error occur in the function execution
     * 
     * @author douglasgabriel
     * @author davileal
     */
    put(req, res, next){

        var query = req.params || {};

        this.Model.find(query, (err, mod) =>{

            if(!mod){
                return next(new Error('Document not find'));
            }

            else{                

                this.Model.findOneAndUpdate(query, req.body, {new : true}, (err, mod) => {

                    if (err){
                        res.send(err);
                    }
                    res.json({mod});

                });
                
            }

        });

    }

    delete(req, res){

        this.Model.findByIdAndRemove(req.params.id, (err, model) => {

            if(err){
                console.log("Error to delete");
            }

            let response = {
                message: "User successfully deleted",
            };

            res.status(200).send(response);

        });

    }

}

module.exports = GenericController;