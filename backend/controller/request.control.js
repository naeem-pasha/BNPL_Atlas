const { default: axios } = require("axios");
const Vendor = require("../models/request.model");
const UserDistributer = require("../models/UserDistributer.model");

const aproveByBank = async (req, res) => {
  try {
    const {
      _id,
      name,
      email,
      cnic,
      EmployID,
      phoneNo,
      City,
      bikeColor,
      bikeVarient,
      isAprovedByBank,
      isAprovedByVendor,
      price_meezan,
    } = req.body.data;

    // Check if the document already exists
    const existingVendor = await Vendor.findOne({ _id });

    if (existingVendor) {
      return res.status(400).json({
        message: "Request already exists",
        data: existingVendor,
      });
    }

    // Create a new instance of the model if not found
    const newRequest = new Vendor({
      _id,
      name,
      email,
      cnic,
      EmployID,
      phoneNo,
      City,
      bikeColor,
      bikeVarient,
      isAprovedByBank,
      isAprovedByVendor,
      price_meezan,
    });

    const saveResponse = await newRequest.save();

    // Send a success response
    res.status(201).json({
      message: "Accepted Successfully",
      data: saveResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllAproveByBank = async (req, res) => {
  try {
    const data = await Vendor.find().sort({ createdAt: -1 });
    // Send a success response
    res.status(201).json({
      message: "data send Successfully",
      data,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const yearMarked = async (req, res) => {
  const { id } = req.params;
  const { chasisNo, engineNo, distributerNo } = req.body;

  if (!chasisNo || !engineNo || !distributerNo) {
    return res.status(404).json({ message: "All field Required" });
  }

  try {
    // Send approval request to Meezan
    try {
      const { data } = await axios.put(
        `${process.env.MEEZAN_URL}/api/request/assignnumber/${id}`,
        {
          chasisNo,
          engineNo,
          status: "Approved from Vendor",
          distributerNo,
        }
      );
    } catch (error) {
      console.error("Meezan request failed:", error.message);
      return res.status(500).json({
        success: false,
        message: `Failed to reach with Meezan server ${error.message}`,
      });
    }
    // Update Vendor
    const responce = await Vendor.findByIdAndUpdate(
      { _id: id },
      {
        chasisNo,
        engineNo,
        isAprovedByVendor: true,
        riskStatus: "Risk Transfer to bank",
        distributerNo,
      },
      { new: true } // Ensure updated document is returned
    );

    if (!responce) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    console.log(responce, process.env.DISTRIBUTER_URL);
    // Send request to Distributor
    try {
      await axios.post(`${process.env.DISTRIBUTER_URL}/api/aprove`, {
        responce,
        distributerNo,
      });
    } catch (error) {
      console.error("Distributor request failed:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to reach with Distributor server" });
    }

    // Success response
    res.status(201).json({
      success: true,
      message: "Data updated successfully",
      data: responce,
    });
  } catch (error) {
    console.error("Internal error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createDistributer = async (req, res) => {
  try {
    const { name, email, phoneNo } = req.body;

    const { data } = await axios.post(
      `${process.env.DISTRIBUTER_URL}/api/create-distributer`,
      {
        name,
        email,
        phoneNo,
      }
    );

    if (data.success === false) {
      res.status(400).json({
        success: false,
        message: "unable to create the distributer",
        data,
      });
    }

    const newUserDistributer = new UserDistributer({
      name,
      email,
      phoneNo,
    });

    await newUserDistributer.save();

    res.status(201).json({
      success: true,
      message: "distributer create successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error?.message || "internal server error",
      error,
    });
  }
};

const getAllDistributer = async (req, res) => {
  try {
    const data = await UserDistributer.find();
    res.status(200).json({
      success: true,
      message: "Distributors retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || error, // Send only the message to avoid exposing stack trace
    });
  }
};

const transFerOwnerShip = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required.",
      });
    }

    // Update ownership transfer status
    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { ownerShipTransfer: true },
      { new: true } // Return the updated document
    );

    // Check if vendor exists
    if (!updatedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Ownership transfer status updated successfully.",
      data: updatedVendor,
    });
  } catch (error) {
    console.error("Error in transFerOwnerShip:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const finalUserAcceptence = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the user's acceptance and delivery letter status
    const result = await Vendor.findByIdAndUpdate(
      id,
      {
        finalAcceptence: true,
        isPublishedDeliveryLetter: true,
      },
      { new: true, lean: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    // Send a PUT request to the external service
    try {
      const externalResponse = await axios.put(
        `${process.env.MEEZAN_URL}/api/request/update-isPublishedDeliveryLetter/${id}`
      );

      // Check if the external request was successful
      if (externalResponse.status !== 200) {
        return res.status(500).json({
          success: false,
          message:
            "Failed to update  Bank to update isPublishedDeliveryLetter.",
          data: externalResponse.data,
        });
      }
    } catch (externalError) {
      console.error("Error in external service request:", externalError);
      return res.status(500).json({
        success: false,
        message: "Error in external service request.",
        error: externalError.message,
      });
    }

    // Return the updated vendor data
    return res.status(200).json({
      success: true,
      message:
        "Vendor acceptance and delivery letter status updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error in finalUserAcceptence controller:", error);
    return res.status(500).json({
      success: false,
      message: "Error in finalUserAcceptence controller.",
      error: error.message,
    });
  }
};

const acceptAutherized = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Vendor.findByIdAndUpdate(
      id,
      { isAcceptAutherized: true },
      { new: true, lean: true }
    );
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in acceptAutherized controller Vendor.",
      error: error.message,
    });
  }
};

const assignDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryDate } = req.body;

    if (!id || !deliveryDate) {
      return res
        .status(400)
        .json({ success: false, message: "ID and deliveryDate are required." });
    }

    const bankResponce = await axios.put(
      `${process.env.MEEZAN_URL}/api/request/assaign-date/${id}`,
      { deliveryDate }
    );

    console.log(bankResponce);

    if (!bankResponce.data.success) {
      return res.status(500).json({
        success: false,
        message: "unable to update the bank.",
      });
    }

    const distributerResponce = await axios.put(
      `${process.env.DISTRIBUTER_URL}/api/update-date/${id}`,
      { deliveryDate }
    );

    if (!distributerResponce.data.success) {
      return res.status(500).json({
        success: false,
        message: "unable to update the Distributer.",
      });
    }
    const result = await Vendor.findByIdAndUpdate(
      id,
      { deliveryDate },
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found." });
    }

    res.status(200).json({
      message: "Delivery date updated successfully.",
      data: result,
      success: true,
    });
  } catch (error) {
    console.error("Error updating delivery date:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

const userAcceptDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Vendor.findByIdAndUpdate(
      id,
      {
        isUserAcceptDelivery: true,
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const recevieInvoiceFromBank = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Vendor.findByIdAndUpdate(
      id,
      { isSendInvoiceToVendor: true },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in sendInvoiceToUser controller.",
      error: error.message,
    });
  }
};

module.exports = {
  aproveByBank,
  getAllAproveByBank,
  yearMarked,
  createDistributer,
  getAllDistributer,
  transFerOwnerShip,
  finalUserAcceptence,
  acceptAutherized,
  assignDate,
  userAcceptDelivery,
  recevieInvoiceFromBank,
};
