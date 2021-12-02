import { Joi } from "express-validation";

export const registerValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,20}$/)
      .required(),
  }),
};

export const loginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,20}$/)
      .required(),
  }),
};
