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
        
    post(req, res){

        const model = new this.Model(req.body);

        model.save((err, newModel) => {

            if (err){
                res.send(err);
            }

            res.json({newModel});

        });
        
    }

}

module.exports = GenericController;