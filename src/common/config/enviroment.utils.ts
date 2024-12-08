import Joi from 'joi';

export const customArrayValidate = (
  value: any,
  helpers: Joi.CustomHelpers<any>,
) => {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return JSON.stringify(parsed);
    }
    throw new Error('Format error');
  } catch (e) {
    return helpers.error(
      'The array enviroment DB_LOGGER_LEVEL value is invalid. It must be an array of strings',
    );
  }
};
