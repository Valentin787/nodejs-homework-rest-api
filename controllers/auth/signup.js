const { User } = require('../../models/user');
const bcrypt = require('bcryptjs')
const  RequestError  = require('../../helpers/RequestError');

const { schemas } = require('../../models/user');


const signup = async (req, res) => {
  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Ошибка от Joi или другой библиотеки валидации")
  };



  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ password: hashPassword, email });
  
  res.status(201).json({
    "user": {
      email: result.email,
      subscription: result.subscription,
    }
  })

};

module.exports = signup;