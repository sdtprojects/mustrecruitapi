import express, { Request, Response } from "express";
import User from "../models/User"; // Import the User model
import {
  hashPassword,
  comparePasswords,
  excludePassword,
} from "../utils/passwordUtils"; // Import utility functions
import { generateToken } from "../utils/jwtUtils";

const router = express.Router();

// CREATE - Register a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists!");
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Create a new user
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    // Exclude password from user object
    const userWithoutPassword = excludePassword(newUser);
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// READ - Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get a single user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Update a user
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json("User not found!");
    }
    // Exclude password from updated user object
    const userWithoutPassword = excludePassword(updatedUser);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete a user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json("User not found!");
    }
    // Exclude password from deleted user object
    const userWithoutPassword = excludePassword(deletedUser);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN - Authenticate user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid email!");
      return res.status(401).json("Invalid email!");
    }
    // Compare passwords
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      console.log("Invalid password!");
      return res.status(401).json("Invalid password!");
    }
    // Exclude password from user object
    const userWithoutPassword = excludePassword(user);
    // Generate JWT token
    const token = generateToken({
      id: userWithoutPassword._id,
      email: userWithoutPassword.email,
      username: userWithoutPassword.username,
      isAdmin: userWithoutPassword.isAdmin,
    });
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
