import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from 'lib/validation.pipe';

const Coordinateschema = Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
});

const EnemiesSchema = Joi.object({
    type: Joi.string()
        .required()
        .valid('soldier', 'mech'),
    number: Joi.number().required(),
});

const ScanSchema = Joi.object({
    coordinates: Coordinateschema,
    enemies: EnemiesSchema,
    allies: Joi.number().optional(),
});

export const EnvironmentSchema = Joi.object({
    protocols: Joi.array()
        .items(Joi.string())
        .required()
        .min(1),
    scan: Joi.array().items(ScanSchema).required(),
});

export const EnvironmentPipe =
    new JoiValidationPipe(EnvironmentSchema);