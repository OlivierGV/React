"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPersonnage = isPersonnage;
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const PersonnageSchema = new mongoose_1.Schema({
    nomComplet: {
        prenom: {
            type: String,
            required: [true, 'Le prénom est obligatoire'],
            minlength: 1,
            maxLength: 255,
            validate: {
                validator: function (value) {
                    return /[a-zA-Z]/g.test(value);
                }
            }
        },
        nom: {
            type: String,
            required: [true, 'Le nom est obligatoire'],
            minlength: 1,
            maxLength: 255,
            validate: {
                validator: function (value) {
                    return value !== this.nomComplet.prenom && /[a-zA-Z]/g.test(value);
                },
                message: 'Le nom ne peut pas être identique au prénom.'
            }
        }
    },
    classe: { type: String, required: [true, 'La classe est obligatoire'], minlength: 1, maxLength: 255 },
    niveau: { type: Number, default: 1, min: 1, max: 20 },
    pointsDeVie: { type: Number, default: 10, min: 0, max: 500 },
    vivant: { type: Boolean, default: true },
    caracteristiques: {
        type: {
            force: { type: Number, required: [true, 'caractéristique force obligatoire'], min: 0, max: 100 },
            dexterite: { type: Number, required: [true, 'caractéristique dextérité obligatoire'], min: 0, max: 100 },
            intelligence: { type: Number, required: [true, 'caractéristique intelligence obligatoire'], min: 0, max: 100 },
            sagesse: { type: Number, required: [true, 'caractéristique sagesse obligatoire'], min: 0, max: 100 },
            charisme: { type: Number, required: [true, 'caractéristique charisme obligatoire'], min: 0, max: 100 }
        },
        required: [true, 'Le personnage doit avoir des caractéristiques définies'],
        _id: false
    },
    competences: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length <= 10;
            },
            message: 'Le nombre maximum de compétences est de 10.'
        }
    },
    capacites: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length <= 10;
            },
            message: 'Le nombre maximum de capacités est de 10.'
        }
    },
    equipement: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length <= 10;
            },
            message: 'Le nombre maximum d\'équipements est de 10.'
        }
    },
    dateDeCreation: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (value) {
                const now = new Date();
                return value <= now;
            },
            message: `vote date doit être ${Date.now} ou plus tôt.`
        }
    },
}, {
    versionKey: false
});
function isPersonnage(arg) {
    var _a, _b, _c;
    return (!!arg &&
        typeof arg === 'object' &&
        'nomComplet' in arg && typeof arg.nomComplet === 'object' &&
        'prenom' in arg.nomComplet && typeof arg.nomComplet.prenom === 'string' &&
        'nom' in arg.nomComplet && typeof arg.nomComplet.nom === 'string' &&
        'classe' in arg && typeof arg.classe === 'string' &&
        'niveau' in arg && typeof arg.niveau === 'number' &&
        'pointsDeVie' in arg && typeof arg.pointsDeVie === 'number' &&
        'vivant' in arg && typeof arg.vivant === 'boolean' &&
        'caracteristiques' in arg && typeof arg.caracteristiques === 'object' && arg.caracteristiques !== null &&
        'force' in arg.caracteristiques && typeof arg.caracteristiques.force == 'number' &&
        'dexterite' in arg.caracteristiques && typeof arg.caracteristiques.dexterite == 'number' &&
        'intelligence' in arg.caracteristiques && typeof arg.caracteristiques.intelligence == 'number' &&
        'sagesse' in arg.caracteristiques && typeof arg.caracteristiques.sagesse == 'number' &&
        'charisme' in arg.caracteristiques && typeof arg.caracteristiques.charisme == 'number' &&
        'competences' in arg && typeof ((_a = arg.competences) === null || _a === void 0 ? void 0 : _a.every(item => typeof item === 'string')) &&
        'capacites' in arg && typeof ((_b = arg.capacites) === null || _b === void 0 ? void 0 : _b.every(item => typeof item === 'string')) &&
        'equipement' in arg && typeof ((_c = arg.equipement) === null || _c === void 0 ? void 0 : _c.every(item => typeof item === 'string')) &&
        'dateDeCreation' in arg && (0, moment_1.default)(arg.dateDeCreation).isValid());
}
exports.default = (0, mongoose_1.model)('Personnage', PersonnageSchema);
