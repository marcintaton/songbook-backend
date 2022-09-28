import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const schemaPOST = Joi.object({
  title: Joi.string().required().min(1),
  tags: Joi.array().items(Joi.string()).required().min(1),
  lyrics: Joi.string().required(),
});
