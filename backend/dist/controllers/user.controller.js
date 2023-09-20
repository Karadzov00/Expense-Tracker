"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            try {
                const user = await user_1.default.findOne({ 'username': username, 'password': password });
                res.json(user);
            }
            catch (err) {
                console.error(err);
                // Handle the error
                res.status(500).json({ message: 'Internal server error' });
            }
        };
        this.register = async (req, res) => {
            let user = new user_1.default({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                profile_picture: req.body.profile_picture
            });
            try {
                const ret = await user.save();
                res.json({ "message": "ok" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ "message": "error" });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map