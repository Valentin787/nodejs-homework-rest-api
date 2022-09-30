const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers/RequestError');

const getContactById = async (req, res, next) => {

  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) { 
    throw RequestError(404)
  };
  res.json(result);
}

module.exports = getContactById