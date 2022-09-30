import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const formSchema = Joi.object({
  title: Joi.string().required().min(1),
  tags: Joi.array().items(Joi.string()).required().min(1),
  lyrics: Joi.string().required(),
  notes: Joi.string().optional().allow(null, ''),
  credits: Joi.string().optional().allow(null, ''),
}).options({ allowUnknown: true });
