const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require('../helpers');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
    token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required']
  }
},
  { versionKey: false, timestamps: true });
  

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
})

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
})

const resendEmailSchema = Joi.object({
  email: Joi.string().min(6).required(),
})

const schemas = {
  registerSchema,
  resendEmailSchema,
  loginSchema
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas
};