import * as Joi from 'joi';

export const schema = Joi.object({
  JWT_SECRET: Joi.string().required().example('my-super-secret-key'),
  JWT_EXPIRES: Joi.string().required().example('1d'),
});
