export const crearError = (statusError, message) => {
    const error = new Error(message);
    error.status = statusError;
    return error;
}