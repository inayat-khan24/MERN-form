import express from "express";

import { 
    create,
  getAllUser,
  getUserById,
  deleteData,
    updateData 

} from "../controller/userController.js";

const router = express.Router();

// POST: Create new user
router.post("/form", create);

// GET: All users
router.get("/forms", getAllUser);

// GET: Single user by ID
router.get("/forms/:id", getUserById);

// DELETE: Delete user by ID
router.delete("/forms/:id", deleteData);

// PUT: Update user by ID
router.put("/forms/update/:id",updateData);

export default router;
