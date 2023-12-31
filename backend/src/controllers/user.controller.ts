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

    register = async (req: express.Request, res: express.Response)=>{
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profile_picture: req.body.image
        })

        try {
            const ret = await user.save();
            res.json({"message": "ok"});
        } catch (error) {
            console.log(error);
            res.status(400).json({"message": "error"})
        }
    }

    findUser = async (req: express.Request, res: express.Response)=>{
        let username = req.body.username; 

        try {
            const user = await User.findOne({'username':username});
            res.json(user);
        } catch (error) {
            res.status(400).json({"message": "error"})
        }
    }

    updatePassword = async (req: express.Request, res: express.Response)=>{
        let username= req.params.username;
        let password= req.body.password;

        try {
            const user = await User.updateOne({'username':username}, {$set: {'password':password}});

            res.json({'message': 'ok'})
        } catch (error) {
            console.log(error)
        }

    }
}
