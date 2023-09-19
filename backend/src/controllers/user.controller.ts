import express from "express";
import User from "../models/user"

export class UserController{


    login = async (req: express.Request, res: express.Response)=>{
        let username = req.body.username; 
        let password = req.body.password;
        
        try {
            const user = await User.findOne({'username': username, 'password': password});
            
            res.json(user);

          } catch (err) {
            console.error(err);
            // Handle the error
            res.status(500).json({ message: 'Internal server error' });
          }
    }
}
