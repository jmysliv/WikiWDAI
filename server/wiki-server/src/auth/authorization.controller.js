import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import jwtSecret from './env.config';

export const login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret.jwt_secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret.jwt_secret);
        let b = new Buffer(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
