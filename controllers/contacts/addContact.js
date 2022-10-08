const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers');
const { schemas } = require('../../models/contact');


const addContact = async (req, res) => {
  const owner = req.user._id;

  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  };
  const result = await Contact.create({...req.body,owner});
  res.status(201).json(result);

}


module.exports = addContact;