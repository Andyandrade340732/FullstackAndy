import { loggerUtils } from "../utils/loggerUtils.js";

export const middlewareLogs = (req, res, next) => {
    try {
        loggerUtils(req);
        next();
    } catch (error) {
        next(error);
    }
}