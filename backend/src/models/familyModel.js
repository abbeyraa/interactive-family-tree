import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "families",
    default: null,
  },
});

const Family = mongoose.model("families", familySchema);
export default Family;
