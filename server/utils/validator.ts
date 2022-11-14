import joi from "joi";

export const validator = <T>(schema: joi.ObjectSchema<T>, payload: T) => {
    const { error } = schema.validate(payload, { abortEarly: false });
    return error;
};