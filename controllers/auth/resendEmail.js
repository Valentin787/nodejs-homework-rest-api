const { User } = require('../../models/user');
const { RequestError,sendEmail } = require('../../helpers');
const { schemas } = require("../../models/user");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  
  const { error } = schemas.resendEmailSchema.validate(req.body);
  if (error) {
    throw RequestError(400,"Ошибка от Joi или другой библиотеки валидации")
  };

  const user = await User.findOne({ email });
  if (!user || user.verify) {
    throw RequestError(400,"Missing required field email")
  }

  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html:`<a target="_blank" href:"${BASE_URL}/users/verify/${user.verificationToken}">Натисніть для регістрації</a>`
  }
  
  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  })
}

module.exports = resendEmail;