// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const upload = require("../middleware/multer");

router.get("/", UserController.getAllUsers);
router.post("/upload", upload.single("image"), UserController.createUser);
router.put(
  "/upload/:userId",
  upload.single("image"),
  UserController.updateUser
);
router.get("/:userId", UserController.getUserById);
router.delete("/:userId", UserController.deleteUser);

router.get("/:userId/addresses", UserController.getUserAddresses);

module.exports = router;
