const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { RequestError,sendEmail } = require('../../helpers');
const { nanoid } = require('nanoid');
const { schemas } = require('../../models/user');
const { BASE_URL } = process.env;


const signup = async (req, res) => {
  const { password, email } = req.body;

  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Ошибка от Joi или другой библиотеки валидации")
  };
  
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    password: hashPassword,
    email,
    avatarURL,
    verificationToken
  });

  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html:`<a target="_blank" href:"${BASE_URL}/users/verify/${verificationToken}">Натисніть для регістрації</a>`
  }

  await sendEmail(mail);

  res.status(201).json({
    "user": {
      email: result.email,
      subscription: result.subscription,
    }
  })
};

module.exports = signup;