const express = require("express");
//const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cors = require("cors");
var methodOverride = require("method-override");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// app.use(express.static("public"));

// // EJS
// app.use(expressLayouts);
// app.set("view engine", "ejs");

// Express body parser
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Routes
app.use("/", require("./routes/index.js"));
app.use("/product", require("./routes/users.js"));

const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
