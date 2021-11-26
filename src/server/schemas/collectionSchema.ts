import { Joi } from "express-validation";

export const addCollection = {
  body: Joi.object({
    name: Joi.string().required(),
    date: Joi.string(),
  }),
};

export const updateCollection = {
  body: Joi.object({
    name: Joi.string().required(),
    date: Joi.string(),
  }),
};
