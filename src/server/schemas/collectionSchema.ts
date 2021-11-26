import { Joi } from "express-validation";

export const addCollectionValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    date: Joi.string(),
  }),
};

export const updateCollectionValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    date: Joi.string(),
  }),
};
