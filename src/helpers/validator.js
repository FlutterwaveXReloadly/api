import out from './out';

export default (schema, data, res, next) => {
    const { error } = schema.validate(data);
    return error ? out(res, 422, error.details[0].message) : next();
}