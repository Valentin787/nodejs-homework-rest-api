const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers/RequestError');

const removeContact =  async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404);
  };

  res.json({ message: "Contact deleted" });
}

module.exports = removeContact;