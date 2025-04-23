import express from "express";
import {
    getAllFamilyMembers,
    addFamilyMember,
    deleteFamilyMember,
} from "../controllers/familyController.js";

const router = express.Router();

router.get("/", getAllFamilyMembers);
router.post("/", addFamilyMember);
router.delete("/:id", deleteFamilyMember);

export default router;
