import Joi from 'joi';
import mongoIdSchema from './common.schema.js';

export const schemaBodyJuego = Joi.object({
    titulo: Joi.string().min(3).max(100).required(),
    descripcion: Joi.string().min(3).max(500).required(),
    anioLanzamiento: Joi.number().integer().min(1970).max(2030),
    categoriaId: Joi.string()
});

export const schemaParamsJuego = Joi.object({
    id: mongoIdSchema
});