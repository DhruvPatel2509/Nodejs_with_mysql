// server.js
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
