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

    register = (req: express.Request, res: express.Response)=>{
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profile_picture: req.body.profile_picture
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}
