"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErr = exports.RouteError = void 0;
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
class RouteError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.RouteError = RouteError;
class ValidationErr extends RouteError {
    constructor(paramName) {
        super(HttpStatusCodes_1.default.BAD_REQUEST, ValidationErr.GetMsg(paramName));
    }
    static GetMsg(param) {
        return ValidationErr.MSG + param + '".';
    }
}
exports.ValidationErr = ValidationErr;
ValidationErr.MSG = 'The follow parameter were missing or invalid "';
