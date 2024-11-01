"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("@src/common/classes");
function isStr(reqObj, params) {
    return _checkWrapper(reqObj, params, _checkStr);
}
function _checkStr(val) {
    if (!!val && typeof val === 'string') {
        return val;
    }
    else {
        return undefined;
    }
}
function isNum(reqObj, params) {
    return _checkWrapper(reqObj, params, _checkNum);
}
function _checkNum(val) {
    const valF = Number(val);
    if (!isNaN(valF)) {
        return valF;
    }
    else {
        return undefined;
    }
}
function isBool(reqObj, params) {
    return _checkWrapper(reqObj, params, _checkBool);
}
function _checkBool(val) {
    if (typeof val === 'boolean') {
        return val;
    }
    else if (typeof val === 'string') {
        val = val.toLowerCase();
        if (val === 'true') {
            return true;
        }
        else if (val === 'false') {
            return false;
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
function isValid(reqObj, param, validatorFn) {
    const val = reqObj[param];
    if (validatorFn(val)) {
        return val;
    }
    else {
        throw new classes_1.ValidationErr(param);
    }
}
function _checkWrapper(reqObj, params, checkFn) {
    if (params instanceof Array) {
        const retVal = [];
        for (const param of params) {
            const val = checkFn(reqObj[param]);
            if (val !== undefined) {
                retVal.push(val);
            }
            else {
                throw new classes_1.ValidationErr(param);
            }
        }
        return retVal;
    }
    const val = checkFn(reqObj[params]);
    if (val !== undefined) {
        return val;
    }
    throw new classes_1.ValidationErr(params);
}
exports.default = {
    isStr,
    isNum,
    isBool,
    isValid,
};
