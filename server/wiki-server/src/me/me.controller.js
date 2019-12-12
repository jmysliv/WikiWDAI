import UserModel from '../models/user.model'

export const getUserByToken = (req, res) => {
    
    UserModel.findById(req.jwt.userId).then((result) => {
        res.status(200).send(result.getUnifiedUser()) ;
    });
 };