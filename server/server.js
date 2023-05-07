const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const keys = require("../server/config/jwt.config");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(fileupload());
app.use("/images", express.static("public"));
app.use(express.static('../client/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/pet.routes")(app);

app.use('/api', require('./routes/users.routes'));

app.set("Key", keys.Key);

const server = app.listen(8000, () => {
  console.log("Se levanto el servidor en el puerto 8000");
});
