const contacts = require('../../models/contacts')
const { RequestError } = require('../../helpers/RequestError');

const getContactById = async (req, res, next) => {

  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) { 
    throw RequestError(404)
  };
  res.json(result);
}

module.exports = getContactById