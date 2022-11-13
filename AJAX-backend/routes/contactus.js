const Contact = require("../models/contact");

const contact_info = async (req, res) => {
  const body = req.body;
  console.log(body);
  var contact = new Contact({
    ...body,
  });
  await contact.save();
  res.status(200).send({
    message: "success",
  });
};

module.exports = contact_info;