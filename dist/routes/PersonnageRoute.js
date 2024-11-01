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
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
const PersonnageService_1 = __importDefault(require("@src/services/PersonnageService"));
const Personnage_1 = require("@src/models/Personnage");
const PersonnageService_2 = require("@src/services/PersonnageService");
const check_1 = __importDefault(require("./common/check"));
function getAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var personnages = yield PersonnageService_1.default.getAll();
        if (personnages.length < 1) {
            return res.status(HttpStatusCodes_1.default.NO_CONTENT).end();
        }
        return res.status(HttpStatusCodes_1.default.OK).json({ personnages });
    });
}
function getByNiveau(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const niveau = Number(req.params.niveau);
        if (niveau > 0) {
            var personnages = yield PersonnageService_1.default.getByNiveau(niveau);
            if (personnages.length < 1) {
                return res.status(HttpStatusCodes_1.default.NO_CONTENT).end();
            }
            return res.status(HttpStatusCodes_1.default.OK).json({ personnages });
        }
        return res.status(HttpStatusCodes_1.default.BAD_REQUEST).end();
    });
}
function orderByDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ordre = String(req.params.ordre);
        if (ordre == 'asc' || ordre == 'desc') {
            var personnages = yield PersonnageService_1.default.orderByDate(ordre);
            return res.status(HttpStatusCodes_1.default.OK).json(personnages);
        }
        return res.status(HttpStatusCodes_1.default.BAD_REQUEST).end();
    });
}
function getOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var id = String(req.params.id);
        var personnage = yield PersonnageService_1.default.getOne(id);
        if (personnage == null) {
            return res.status(HttpStatusCodes_1.default.NOT_FOUND).end();
        }
        return res.status(HttpStatusCodes_1.default.OK).json({ personnage });
    });
}
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const personnage = req.body.personnage;
        if (!(0, Personnage_1.isPersonnage)(personnage)) {
            return res.status(HttpStatusCodes_1.default.BAD_REQUEST).json(({ error: 'Personnage requis' }));
        }
        yield PersonnageService_1.default.addOne(personnage);
        return res.status(HttpStatusCodes_1.default.CREATED).end();
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const personnage = check_1.default.isValid(req.body, 'Personnage', Personnage_1.isPersonnage);
        const resultat = yield PersonnageService_1.default.updateOne(personnage);
        if (resultat !== PersonnageService_2.PERSONNAGE_NOT_FOUND_ERR) {
            return res.status(HttpStatusCodes_1.default.OK).end();
        }
        return res.status(HttpStatusCodes_1.default.NOT_FOUND).json({ erreur: PersonnageService_2.PERSONNAGE_NOT_FOUND_ERR });
    });
}
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = check_1.default.isStr(req.params, 'id');
        const personnage = yield PersonnageService_1.default.delete(id);
        return res.status(HttpStatusCodes_1.default.OK).json(personnage);
    });
}
exports.default = {
    getAll,
    getOne,
    getByNiveau,
    orderByDate,
    add,
    update,
    delete: delete_,
};
