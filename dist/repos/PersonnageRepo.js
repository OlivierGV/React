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
const Personnage_1 = __importDefault(require("@src/models/Personnage"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return Personnage_1.default.find();
    });
}
function getByNiveau(niveau) {
    return __awaiter(this, void 0, void 0, function* () {
        return Personnage_1.default.find({ niveau: niveau });
    });
}
function orderByDate(ordre) {
    return __awaiter(this, void 0, void 0, function* () {
        return Personnage_1.default.find({}).sort({ dateDeCreation: ordre === 'asc' ? 1 : -1 });
    });
}
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Personnage_1.default.findById(id);
    });
}
function persists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const personnage = yield Personnage_1.default.findById(id);
        return personnage !== null;
    });
}
function add(personnage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Personnage_1.default.create(personnage);
    });
}
function update(personnage) {
    return __awaiter(this, void 0, void 0, function* () {
        const personneUpdate = yield Personnage_1.default.findById(personnage._id);
        if (personneUpdate !== null) {
            personneUpdate.nomComplet.prenom = personnage.nomComplet.prenom;
            personneUpdate.nomComplet.nom = personnage.nomComplet.nom;
            personneUpdate.classe = personnage.classe;
            personneUpdate.niveau = personnage.niveau;
            personneUpdate.pointsDeVie = personnage.pointsDeVie;
            personneUpdate.vivant = personnage.vivant;
            personneUpdate.caracteristiques = personnage.caracteristiques;
            personneUpdate.competences = personnage.competences;
            personneUpdate.capacites = personnage.capacites;
            personneUpdate.equipement = personnage.equipement;
            personneUpdate.dateDeCreation = personnage.dateDeCreation;
            yield personneUpdate.save();
        }
    });
}
function delete_(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Personnage_1.default.findByIdAndDelete(id);
    });
}
exports.default = {
    getOne,
    getByNiveau,
    orderByDate,
    persists,
    getAll,
    add,
    update,
    delete: delete_,
};
