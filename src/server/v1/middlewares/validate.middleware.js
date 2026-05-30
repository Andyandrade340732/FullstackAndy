export const validateMiddleware = (schema, campoAValidar) => {
    const otraFuncionClausura = (req, res, next) => {
        const campoDelReqAValidar = req[campoAValidar];
        const { error, value } = schema.validate(campoDelReqAValidar, { abortEarly: false });
        if (error) {
            return next(error);
        }
        req[campoAValidar] = value;
        next();
    }
    return otraFuncionClausura;
}