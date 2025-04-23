import Family from "../models/familyModel.js";

// GET
export const getAllFamilyMembers = async (req, res) => {
  try {
    const members = await Family.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST
export const addFamilyMember = async (req, res) => {
  try {
    const newMember = new Family(req.body);
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log("ERrOR: ", error)
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteFamilyMember = async (req, res) => {
  try {
    await Family.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
