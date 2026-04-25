export const validateMiddleware = (schema, campoAValidar) => {
    const otraFuncionClausura = (req, res, next) => {
        const campoDelReqAValidar = req[campoAValidar];
        const { error, value } = schema.validate(campoDelReqAValidar, { abortEarly: false });
        if (error) {
            const mensaje = error.details.map(e => e.message).join(", ");
            const miError = new Error(mensaje);
            return next(miError);
        }
        req[campoAValidar] = value;
        next();
    }
    return otraFuncionClausura;
}