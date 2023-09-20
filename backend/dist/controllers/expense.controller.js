"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const category_1 = __importDefault(require("../models/category"));
class ExpenseController {
    constructor() {
        this.fetchAllCategories = async (req, res) => {
            console.log("expense controller");
            try {
                const books = await category_1.default.find({});
                res.json(books);
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expense.controller.js.map