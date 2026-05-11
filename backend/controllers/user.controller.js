import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const regiterUser = async(req,res) => {
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password) {
            return res.status(400).json({message : "All fields required"})
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message : "User already exists"})
        }
         
        const newUser = new User({username : username, email : email, password : password})
        await newUser.save()
        const token = generateToken(newUser._id)    // generate token for new user using new user's id

        // res.status(201).json({message : "User registered successfully!!", newUser})
        res.status(201).json({id: newUser._id, username: newUser.username, email: newUser.email, token})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

}

export const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message : "All fields required"})
        }
        const user = await User.findOne({email})
        if(!user || !(await user.matchPassword(password) )){                  // if there is not user or the password dosen't match 
            return res.status(401).json({message: "Invalid credentials"})
        }
        const token = generateToken(user._id);
        res.status(200).json({id: user._id, username: user.username, email: user.email, token})

    } catch (error) {
        res.status(500).json({message : "Server error"})
    }
}

// Me : 
export const me = async(req,res) => {
    res.status(200).json(req.user)              // sends back the currently logged in user info. 
}

// generate JWT
const generateToken = (id) => {

    // takes 1 argument - id - it's user's unique id from mongoDB
    // generate token which contains this user id and a secret key, this function must return a token as a string 
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})

}   // we want to generate token everytime someone registers or logins