'use stict'

const mongoose = require('mongoose');

class GenericController {

    constructor (resource){

        this.resource = resource;
        this.Model = mongoose.model(resource.name);

    }    

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