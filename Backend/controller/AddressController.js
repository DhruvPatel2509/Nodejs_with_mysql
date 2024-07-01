const db = require("../db");

exports.getAllAddresses = (req, res) => {
  db.query("SELECT * FROM addresses", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

exports.createAddress = (req, res) => {
  const {
    userId,
    houseNo,
    streetName,
    landmark,
    cityName,
    stateName,
    countryName,
  } = req.body;
  db.query(
    "INSERT INTO addresses (userId, houseNo, streetName, landmark, cityName, stateName, countryName) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, houseNo, streetName, landmark, cityName, stateName, countryName],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Address created successfully",
        addressId: result.insertId,
      });
    }
  );
};

exports.getAddressById = (req, res) => {
  const uid = req.params.userId;
  console.log(uid);
  db.query(
    "SELECT * FROM addresses WHERE userId = ?",
    [uid],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res
          .status(200)
          .json({ success: false, error: "Address not found" });
      }
      res.json({ success: true, results: results });
    }
  );
};

exports.getAddressByAddressId = (req, res) => {
  console.log(req.params.addressId);
  // db.query(
  //   "SELECT * FROM addresses WHERE userId = ?",
  //   [uid],
  //   (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).json({ error: "Internal Server Error" });
  //     }
  //     if (results.length === 0) {
  //       return res.status(200).json({ error: "Address not found" });
  //     }
  //     res.json(results);
  //   }
  // );
};

exports.updateAddress = (req, res) => {
  const addressId = req.params.addressId;
  const { houseNo, streetName, landmark, cityName, stateName, countryName } =
    req.body;
  db.query(
    "UPDATE addresses SET houseNo = ?, streetName = ?, landmark = ?, cityName = ?, stateName = ?, countryName = ? WHERE id = ?",
    [
      houseNo,
      streetName,
      landmark,
      cityName,
      stateName,
      countryName,
      addressId,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Address not found" });
      }
      res.json({ message: "Address updated successfully" });
    }
  );
};

exports.deleteAddress = (req, res) => {
  const addressId = req.params.addressId;
  db.query("DELETE FROM addresses WHERE addressid = ?", [addressId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(200)
        .json({ success: false, error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  });
};
