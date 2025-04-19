const { Router } = require("express");
const {
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
  sendToBankFinalInvoice,
  rejectSalesRecipt,
} = require("../controller/request.control");

const route = Router();

route.post("/bybank", aproveByBank);

route.post("/");

route.put("/transferownership/:id", transFerOwnerShip);

route.get("/getAllAprove", getAllAproveByBank);

route.put("/yearMarked/:id", yearMarked);

route.post("/create-distributer", createDistributer);

route.get("/get-distributers", getAllDistributer);

route.put("/final-acceptence/:id", finalUserAcceptence);

route.put("/accept-autherized/:id", acceptAutherized);

route.put("/send-invoice-vendor/:id", recevieInvoiceFromBank);

route.put("/assaign-date/:id", assignDate);

route.put("/user-accept-delivery/:id", userAcceptDelivery);

route.put("/send-to-bank-finalinvoice/:id", sendToBankFinalInvoice);

route.put("/rejectsale-receipt/:id", rejectSalesRecipt);

module.exports = route;
