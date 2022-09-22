const contacts = require('../../models/contacts')
const { RequestError } = require('../../helpers/RequestError');
const { updateSchema } = require('../../schemas/schemas');

const updateContact =  async (req, res, next) => {

  const { contactId } = req.params;
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw RequestError(400,"missing fields")
  }

  const result = await contacts.updateContact(contactId, req.body)
  if (!result) {
    throw RequestError(404);
  }

  res.json(result);


}

module.exports = updateContact;
