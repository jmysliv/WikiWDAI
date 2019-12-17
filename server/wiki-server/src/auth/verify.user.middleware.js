import UserModel from '../models/user.model';
import crypto from 'crypto';
import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);

export const isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findOne({email: req.body.email}, (err, result) => {})
        .then((user)=>{
            if(!user){
                res.status(404).send({});
            }else{
                let passwordFields = user.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user._id,
                        email: user.email,
                        admin: user.admin,
                        provider: 'email',
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};

export const checkIfAdmin = (req, res, next) => {

        if(req.jwt.admin === true){
            return next();
        } else{
            return res.status(403).send();
        }
}
