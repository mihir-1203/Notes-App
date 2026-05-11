import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const protect = async(req,res,next) => {
    let token;

    // 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // extract the token : 
            token = req.headers.authorization.split(" ")[1];   // [0] - word 'Bearer', [1] - token (extract token)
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            return next();

        } catch (error) {
            console.error("Token varification failed", error.message);
            return res.status(401).json({message: "Not authorized, token failed"})
        }
    }

    return res.status(401).json({message: "Not authorized, token failed"})


} 


// we want to check if there is authorization header in the request
// format: Authorization: Bearer <token>
                // we want to conform that the header starts with Bearer.


// steps : 
// if req.headers.authorization is true && it starts with Bearer: req.headers.authorization.startsWith('Bearer')

// extract the token: token = req.headers.authorization.split(" ")[1], extract token from req.headers.authorization using split, in that first element is the word - 'Bearer' and second element is the token[1]

// then verify the token - jwt.verify verifies the token if its valid, it uses secret key, if its valid it decodes the token and gives the object of user data.

//  req.user = await User.findById(decoded.id).select("-password") - req.user has user's info, uses the id from the decoded token to find the user in mongoDB, and (-password) tells mongoDB to exclude the password when returning the User.