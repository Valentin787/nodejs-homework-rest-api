const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');
const { schemas } = require('../../models/contact');

const updateContact =  async (req, res, next) => {
  const { contactId } = req.params;

  const { error } = schemas.updateSchema.validate(req.body);
  if (error) {
    throw RequestError(400,"missing fields")
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw RequestError(404);
  }
  
  res.json(result);
}

module.exports = updateContact;