import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true})



// create a middleware that will run before the user info is stored in database. 
// hash the password before storing to db.

// pre save hook using mongoose : this function will run before the user document is saved.
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()          // if password is not modified when(new user added or updating password), next()

    const salt = await bcrypt.genSalt(10)       // genSalt : random string added to the password before hashing.

    this.password = await bcrypt.hash(this.password, 10)        // (10 or salt)
    // next()      // next() - middleware work done, now save info to database
}) 



// custom method to match the hashed pasword stored in DB to the user's enterd password during Login process: 
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)     // enterdPassword entered by user when Login and this.password is the hashed password stored in database.
}


const User = mongoose.model('User', userSchema);
export default User;