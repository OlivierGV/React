"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERSONNAGE_NOT_FOUND_ERR = void 0;
const classes_1 = require("@src/common/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
const PersonnageRepo_1 = __importDefault(require("@src/repos/PersonnageRepo"));
const Personnage_1 = __importDefault(require("@src/models/Personnage"));
exports.PERSONNAGE_NOT_FOUND_ERR = 'Personnage non-trouvé';
function getAll() {
    return PersonnageRepo_1.default.getAll();
}
function getOne(id) {
    return PersonnageRepo_1.default.getOne(id);
}
function getByNiveau(niveau) {
    return PersonnageRepo_1.default.getByNiveau(niveau);
}
function orderByDate(ordre) {
    return PersonnageRepo_1.default.orderByDate(ordre);
}
function addOne(personnage) {
    return PersonnageRepo_1.default.add(personnage);
}
function updateOne(personnage) {
    return __awaiter(this, void 0, void 0, function* () {
        const personneUpdate = yield Personnage_1.default.findById(personnage._id);
        if (personneUpdate !== null) {
            return PersonnageRepo_1.default.update(personnage);
        }
        return exports.PERSONNAGE_NOT_FOUND_ERR;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield PersonnageRepo_1.default.persists(id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.PERSONNAGE_NOT_FOUND_ERR);
        }
        yield PersonnageRepo_1.default.delete(id);
    });
}
exports.default = {
    getAll,
    getByNiveau,
    orderByDate,
    getOne,
    addOne,
    updateOne,
    delete: _delete,
};
