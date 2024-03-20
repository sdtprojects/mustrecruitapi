"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User")); // Import the User model
const passwordUtils_1 = require("../utils/passwordUtils"); // Import utility functions
const jwtUtils_1 = require("../utils/jwtUtils");
const router = express_1.default.Router();
// CREATE - Register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists!");
        }
        // Hash the password
        const hashedPassword = await (0, passwordUtils_1.hashPassword)(password);
        // Create a new user
        const newUser = new User_1.default({ ...req.body, password: hashedPassword });
        await newUser.save();
        // Exclude password from user object
        const userWithoutPassword = (0, passwordUtils_1.excludePassword)(newUser);
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
// READ - Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// READ - Get a single user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found!");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// UPDATE - Update a user
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json("User not found!");
        }
        // Exclude password from updated user object
        const userWithoutPassword = (0, passwordUtils_1.excludePassword)(updatedUser);
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE - Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json("User not found!");
        }
        // Exclude password from deleted user object
        const userWithoutPassword = (0, passwordUtils_1.excludePassword)(deletedUser);
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// LOGIN - Authenticate user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log("Invalid email!");
            return res.status(401).json("Invalid email!");
        }
        // Compare passwords
        const isMatch = await (0, passwordUtils_1.comparePasswords)(password, user.password);
        if (!isMatch) {
            console.log("Invalid password!");
            return res.status(401).json("Invalid password!");
        }
        // Exclude password from user object
        const userWithoutPassword = (0, passwordUtils_1.excludePassword)(user);
        // Generate JWT token
        const token = (0, jwtUtils_1.generateToken)({
            id: userWithoutPassword._id,
            email: userWithoutPassword.email,
            username: userWithoutPassword.username,
            isAdmin: userWithoutPassword.isAdmin,
        });
        res.status(200).json({ user: userWithoutPassword, token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=usersRoute.js.map