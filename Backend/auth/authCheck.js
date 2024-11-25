import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if(!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    const secret = process.env.ACCESS_TOKEN;
    jwt.verify(token, secret, (err, user) => {
        if(err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    });
}