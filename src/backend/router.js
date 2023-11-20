import Router from "koa-router";

export const router = new Router();

export class ApiError extends Error {
    constructor (status, message, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export const apiError = (status, message, details)=>new ApiError(status, message, details);
export default router;