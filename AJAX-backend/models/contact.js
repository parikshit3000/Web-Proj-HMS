const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    maxlength: 50,
  },

  number: {
    type: Number,
    required: true,
    maxlength: 11,
  },

  message: {
    type: String,
    maxlength: 200,
  },
});

//module.exports = mongoose.model('Doctor', doctorSchema);

module.exports = new mongoose.model("Contacts", contactSchema);
