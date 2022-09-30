const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers');
const { schemas } = require('../../models/contact');


const addContact = async (req, res, next) => {

  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  };
  const result = await Contact.create(req.body);
  res.status(201).json(result);

}


module.exports = addContact;