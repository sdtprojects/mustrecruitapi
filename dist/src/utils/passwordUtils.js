"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludePassword = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt_1.default.compare(password, hashedPassword);
    return match;
};
exports.comparePasswords = comparePasswords;
const excludePassword = (user) => {
    const { password, ...userWithoutPassword } = user._doc;
    return userWithoutPassword;
};
exports.excludePassword = excludePassword;
//# sourceMappingURL=passwordUtils.js.map