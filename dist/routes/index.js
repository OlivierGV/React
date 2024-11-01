"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jet_validator_1 = __importDefault(require("jet-validator"));
const Paths_1 = __importDefault(require("../common/Paths"));
const PersonnageRoute_1 = __importDefault(require("./PersonnageRoute"));
const Personnage_1 = __importDefault(require("@src/models/Personnage"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
const apiRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
function ValidatePersonnage(req, res, next) {
    if (req.body === null) {
        res
            .status(HttpStatusCodes_1.default.BAD_REQUEST)
            .send({ error: 'Personnage requis' })
            .end();
        return;
    }
    if (req.body.personnage === null) {
        res
            .status(HttpStatusCodes_1.default.BAD_REQUEST)
            .send({ error: 'Personnage requis' })
            .end();
        return;
    }
    const nouveauPersonnage = new Personnage_1.default(req.body.personnage);
    const error = nouveauPersonnage.validateSync();
    if (error !== null && error !== undefined) {
        res.status(HttpStatusCodes_1.default.BAD_REQUEST).send(error).end();
    }
    else {
        next();
    }
}
const personnageRouter = (0, express_1.Router)();
personnageRouter.get(Paths_1.default.Personnages.GetAll, PersonnageRoute_1.default.getAll);
personnageRouter.get(Paths_1.default.Personnages.GetOne, PersonnageRoute_1.default.getOne);
personnageRouter.get(Paths_1.default.Personnages.GetByNiveau, PersonnageRoute_1.default.getByNiveau);
personnageRouter.get(Paths_1.default.Personnages.orderByDate, PersonnageRoute_1.default.orderByDate);
personnageRouter.post(Paths_1.default.Personnages.Add, PersonnageRoute_1.default.add);
personnageRouter.put(Paths_1.default.Personnages.Update, PersonnageRoute_1.default.update);
personnageRouter.delete(Paths_1.default.Personnages.Delete, PersonnageRoute_1.default.delete);
apiRouter.use(Paths_1.default.Personnages.Base, personnageRouter);
exports.default = apiRouter;
