const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const owner = req.user._id;

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate("owner", "email");
  
  res.json(result);
};

  module.exports = listContacts;