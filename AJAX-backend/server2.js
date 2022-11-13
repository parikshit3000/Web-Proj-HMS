const express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  passport = require("passport"), 
  path = require("path"),
  app = express();
app.use(express.static("public"));

//DB CONFIG
const db = require("./config/keys").mongoURI;
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Mongo DB Connected");
    } else {
      console.log(err);
    }
  }
);

// CORS
app.use(cors());

//EJS
// app.use(expressLayouts);
// Removing
// app.set("view engine", "ejs");

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "Hospital-Management-Sys")));
app.set("view engine", "ejs");

//EXPRESS-SESSION MIDDLEWARE
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//CONNECT FLASH
app.use(flash());

//GLOBAL VARS
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const itemsSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome!",
});
const item2 = new Item({
  name: "To Apna Hospital!",
});
// const item3 = new Item({
//   name: "",
// });
const defaultItems = [item1, item2];

app.get("/opd", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) console.log(err);
        console.log("Successfully Saved");
      });
      res.redirect("/");
    } else {
      if (err) console.log(err);
    //   console.log(foundItems);
      res.render("list", { kindOfDay: "Today", newListItems: foundItems });
    }
  });
});

app.post("/opd", function (req, res) {
  const itemName = req.body.newItem;

  const item4 = new Item({
    name: itemName
  });
  item4.save();
  res.redirect("/opd");
});

app.post("/delete", function (req, res) {
  // console.log(req.body.checkbox);
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) console.log("Successfully Removed");
    res.redirect("/opd");
  });
});

app.use("/", require("./routes/index"));
app.use("/", require("./routes/index1"));

const PORT = process.env.PORT || 4100;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  console.log("Server started on" + PORT);
});
