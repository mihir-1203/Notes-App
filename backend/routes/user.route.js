import express from 'express';
import { loginUser, me, regiterUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/register', regiterUser)
router.post('/login', loginUser)

router.get('/me', protect, me)               
// this route sends back the currently logged in user's info. but how does the server knows who's logged in now, for requires a middleware function nameed 'protect', 
// this middleware will check that the user sent the valid jwt token in the request, if its valid it finds the user from the database and adds it to (req.user)


export default router