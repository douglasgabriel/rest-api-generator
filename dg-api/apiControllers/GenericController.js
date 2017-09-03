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
     * @param {Request} req - object that represents the request of the client.
     * @param {Response} res - object that represents the response that will be served to client.
     * 
     * @author douglasgabriel
     */
    get(req, res){

        this.Model.find({}, (err, model) => {

            if (err){
                req.send(err);
            }

            res.json(model);

        });
        
    }
    
    getById(req, res){
    
        this.Model.findById(req.params.id, (err, model) => {

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

    put(req, res){

        this.Model.findById(req.params.id, (err, mod) =>{

            if(!mod){
                return next(new Error('Document not find'));
            }

            else{
                const model = new this.Model(req.body);

                model.save((err, newModel) => {
                    if (err){
                        res.send(err);
                    }
                    res.json({newModel});
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