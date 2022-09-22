const contacts = require('../../models/contacts')
const { RequestError } = require('../../helpers/RequestError');
const { addSchema } = require('../../schemas/schemas');

const addContact = async (req, res, next) => {

  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  };
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);

}

module.exports = addContact;
