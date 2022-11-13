const express = require("express"),
  cors = require('cors'),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  session = require("express-session"),
  bodyParser = require('body-parser')
  passport = require("passport"),
  path = require("path"),
  app = express();


//DB CONFIG
const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    console.log('Mongo DB Connected')
  } else {
    console.log(err)
  }
});

// CORS
app.use(cors())

//EJS
// app.use(expressLayouts);
// Removing
// app.set("view engine", "ejs");

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'Hospital-Management-Sys')));

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

app.use("/", require("./routes/index"));
app.use("/", require("./routes/index1"));

const PORT = process.env.PORT || 4100;

app.listen(PORT,(err)=>{
  if(err){
      console.log(err)
      process.exit()
  }
  console.log("Server started on" + PORT)
})