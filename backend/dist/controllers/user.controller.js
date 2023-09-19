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
            const user = await user_1.default.findOne({ 'username': username, 'password': password });
            if (user) {
                res.json(user);
            }
            else {
                // Handle the case where no user was found
                res.status(404).json({ message: 'User not found' });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map