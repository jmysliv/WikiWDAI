import mongoose from 'mongoose'
import crypto from 'crypto'
import UserModel from '../models/user.model'

export const insertUser = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                     .update(req.body.password)
                                     .digest("base64");
    req.body.password = salt + "$" + hash;
    const newUser = new UserModel(req.body);
    UserModel.findOne({email: req.body.email}, (err, result) => {})
    .then((user)=>{
        if(user) {
            res.status(406).send({error: "Given email exists in database"})
        } else{
            newUser.save().then((result) => {
                res.status(201).send({id: result._id});
            });
        } 
    });
 };

 export const userGetById = (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).send({message: "invalid id syntax"})
        return;
    }
    UserModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result.getUnifiedUser()) ;
    });
 };

 export const userGet = (req, res) => {
    UserModel.find().then((result) => {
        res.status(200).send(result.map(x => x.getUnifiedUser())) ;
    });
 };

 export const userPut = (req, res) =>{
     UserModel.findByIdAndUpdate(req.params.userId, req.body, (err, result) => {
         if (err){
             res.status(500).send(err)
         } else {
            res.status(200).send(result.getUnifiedUser());
         }
     })
 }

 export const userDelete = (req, res) => {
    UserModel.findByIdAndRemove(req.params.userId, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send();
    })
 }