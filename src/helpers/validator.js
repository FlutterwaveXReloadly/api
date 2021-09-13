import out from './out';

export default (schema, data, res, next) => {
    const { error } = schema.validate(data);
    return error
      ? out(
          res,
          { error: error.details[0].message },
          422,
          "Validation failed",
          "HV0-0"
        )
      : next();
}