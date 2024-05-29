// routes/addressRoutes.js
const express = require("express");
const router = express.Router();
const AddressController = require("../controller/AddressController");

router.get("/", AddressController.getAllAddresses);
router.post("/", AddressController.createAddress);
router.get("/:userId", AddressController.getAddressById);
router.get("/aid/:addressId", AddressController.getAddressByAddressId);
router.put("/:addressId", AddressController.updateAddress);
router.delete("/:addressId", AddressController.deleteAddress);

module.exports = router;
