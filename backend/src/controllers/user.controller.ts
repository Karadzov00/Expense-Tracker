import express from "express";
import User from "../models/user"

export class UserController{


    login = async (req: express.Request, res: express.Response)=>{
        let username = req.body.username; 
        let password = req.body.password;
        
        const user = await User.findOne({'username':username, 'password':password});
        if (user) {
            res.json(user);
        } else {
            // Handle the case where no user was found
            res.status(404).json({ message: 'User not found' });
        } 
   
        
    }
}
