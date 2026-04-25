import Joi from 'joi';
import mongoIdSchema from './common.schema.js';

export const schemaBodyCategoria = Joi.object({
    nombre: Joi.string().min(3).max(50).required(),
    descripcion: Joi.string().min(3).max(200)
});

export const schemaParamsCategoria = Joi.object({
    id: mongoIdSchema
});