const { User } = require('../../models/user');

const bcrypt = require('bcryptjs');

const RequestError = require('../../helpers/RequestError');

const jwt = require('jsonwebtoken');

const { schemas } = require('../../models/user');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {

  const { error } = schemas.loginSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Ошибка от Joi или другой библиотеки валидации")
  };
  
  const { password, email } = req.body;
  const user = await User.findOne({ email });



  if (!user) {
    throw RequestError(401, "Email or password wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequestError(401, "Email or password wrong");
  };

  const payload = {
    id: user._id,
  };
  
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" })
  await User.findByIdAndUpdate(user._id, { token });
  
  res.json({
    "token": token,
    "user": {
      "email": user.email,
      "subscription": user.subscription
    }
  })
 
}

module.exports = login;
