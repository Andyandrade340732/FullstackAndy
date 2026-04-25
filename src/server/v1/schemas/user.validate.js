import Joi from 'joi';

export const schemaBodyRegister = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().valid('admin', 'user')
});

export const schemaBodyLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});