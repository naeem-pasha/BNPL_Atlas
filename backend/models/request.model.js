const mongoose = require("mongoose");
const { type } = require("os");

const VendorSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    cnic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\d{5}-\d{7}-\d{1}$/,
        "Invalid CNIC format (e.g., 12345-1234567-1)",
      ],
    },
    email: { type: String, required: true, unique: true, trim: true },
    EmployID: { type: String, required: true, trim: true },
    phoneNo: {
      type: String,
      required: true,
      match: [/^03\d{9}$/, "Invalid phone number format (e.g., 03001234567)"],
    },
    City: { type: String, required: true, trim: true },
    bikeColor: { type: String, required: true, trim: true },
    bikeVarient: { type: String, required: true, trim: true },
    engineNo: { type: Number },
    chasisNo: { type: Number },
    status: { type: String },
    riskStatus: { type: String },
    isAprovedByBank: { type: Boolean, default: false },
    isAprovedByVendor: { type: Boolean, default: false },
    distributerNo: { type: Number },
    ownerShipTransfer: { type: Boolean, default: false },
    finalAcceptence: { type: Boolean, default: false },
    isPublishedDeliveryLetter: { type: Boolean, default: false },
    isAcceptAutherized: { type: Boolean, default: false },
    deliveryDate: { type: String },
    isSendInvoiceToVendor: { type: Boolean },
    isUserAcceptDelivery: { type: Boolean },
    price_meezan: { type: Number },
    isSendFinalInvoiceToBank: { type: Boolean },
    isInvoiceRejectedByBank: { type: Boolean },
    isRejectPurchaseOrder: { type: Boolean },
    isRejectMusawamah: { type: Boolean },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
