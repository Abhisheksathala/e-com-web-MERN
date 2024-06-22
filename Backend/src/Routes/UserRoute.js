import express from 'express';
import { signUp, loginUser } from '../Controllers/UserController.js'; // Corrected import names

const UserRoute = express.Router(); // Ensure UserRoute is defined

UserRoute.post('/login', loginUser); // Correct route to use loginUser function
UserRoute.post('/signup', signUp); // Correct route to use signUp function

export { UserRoute }; // Ensure UserRoute is exported
