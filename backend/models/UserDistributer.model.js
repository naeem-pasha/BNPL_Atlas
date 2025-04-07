const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNo: {
      type: String,
      required: true,
      match: [/^03\d{9}$/, "Invalid phone number format (e.g., 03001234567)"],
    },
  },
  { timestamps: true }
);

const UserDistributer = mongoose.model("UserDistributer", userSchema);

module.exports = UserDistributer;
