const contacts = require('../../models/contacts')
const { RequestError } = require('../../helpers/RequestError');

const removeContact =  async (req, res, next) => {

  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404);
  }
  res.json({message: "Contact deleted"})
    
}

module.exports = removeContact;
