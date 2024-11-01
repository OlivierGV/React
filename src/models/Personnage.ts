import mongoose, { Schema, model } from 'mongoose';
import moment from 'moment';

// **** Types **** //
export interface IPersonnage {
    nomComplet: { 
        prenom: string; 
        nom: string
    };
    classe: string;
    niveau?: number;
    pointsDeVie?: number;
    vivant?: boolean;
    caracteristiques?: {
        force?: number;
        dexterite?: number;
        intelligence?: number;
        sagesse?: number;
        charisme?: number;
    };
    competences?: string[];
    capacites?: string[];
    equipement?: string[];
    dateDeCreation?: Date;
    _id?: string;
}

// **** Schema **** //
const PersonnageSchema = new Schema<IPersonnage>({
  nomComplet: {
    prenom: { 
      type: String, 
      required: [true, 'Le prénom est obligatoire'], 
      minlength: 1, 
      maxLength: 255,
      validate: {
        validator: function (value : string) {
          return /[a-zA-Z]/g.test(value);
        }
      }
    },
    nom : { 
      type: String, 
      required: [true, 'Le nom est obligatoire'], 
      minlength: 1, 
      maxLength: 255,
      validate: {
        validator: function (value: string) {
          return value !== this.nomComplet.prenom && /[a-zA-Z]/g.test(value);
        },
        message: 'Le nom ne peut pas être identique au prénom.'
      }
    }
  },
  classe: { type: String, required: [true, 'La classe est obligatoire'], minlength: 1, maxLength: 255}, //Orc Voleur Des Brumes Sombres D'Azérothes
  niveau: { type: Number, default: 1, min: 1, max: 20 },
  pointsDeVie: { type: Number, default: 10, min: 0, max: 500 },
  vivant: { type: Boolean, default: true } ,
  caracteristiques: {
    type: {
      force: { type: Number, required: [true, 'caractéristique force obligatoire'], min: 0, max: 100},
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
      validator: function (value: string[]) {
        return value.length <= 10;
      },
      message: 'Le nombre maximum de compétences est de 10.'
    } },
  capacites: { 
    type: [String],
    validate: {
      validator: function (value: string[]) {
        return value.length <= 10;
      },
      message: 'Le nombre maximum de capacités est de 10.'
    } 
  },
  equipement: { 
    type: [String],
    validate: {
      validator: function (value: string[]) {
        return value.length <= 10;
      },
      message: 'Le nombre maximum d\'équipements est de 10.'
    } 
  },
  dateDeCreation: { 
    type: Date, 
    default: Date.now,
    validate: {
        /**
         * Le code suivant a été partiellement inspiré de :
         * https://stackoverflow.com/questions/61762380/mongoose-how-to-restrict-date-to-be-bigger-than-today%C2%B4s-date
         * Code réutilisé depuis mon formatif et modifié
         */
        validator: function (value: Date)
        {
          const now = new Date();
          return value <= now;
        },
        message: `vote date doit être ${Date.now} ou plus tôt.`
      } 
    },
},
{
  versionKey: false
})

/**
 * Vérifier si l'argument respecte les critères de IPersonnage.
 */
export function isPersonnage(arg: unknown): arg is IPersonnage {
    return (
        !!arg &&
        typeof arg === 'object' &&
        'nomComplet' in arg && typeof (arg as IPersonnage).nomComplet === 'object' &&
        'prenom' in (arg as IPersonnage).nomComplet && typeof (arg as IPersonnage).nomComplet.prenom === 'string' &&
        'nom' in (arg as IPersonnage).nomComplet && typeof (arg as IPersonnage).nomComplet.nom === 'string' &&
        'classe' in arg && typeof (arg as IPersonnage).classe === 'string' &&
        'niveau' in arg && typeof (arg as IPersonnage).niveau === 'number' &&
        'pointsDeVie' in arg && typeof (arg as IPersonnage).pointsDeVie === 'number' &&
        'vivant' in arg && typeof (arg as IPersonnage).vivant === 'boolean' &&
        'caracteristiques' in arg && typeof arg.caracteristiques === 'object' && arg.caracteristiques !== null &&
        'force' in arg.caracteristiques && typeof arg.caracteristiques.force == 'number' &&
        'dexterite' in arg.caracteristiques && typeof arg.caracteristiques.dexterite == 'number' &&
        'intelligence' in arg.caracteristiques && typeof arg.caracteristiques.intelligence == 'number' &&
        'sagesse' in arg.caracteristiques && typeof arg.caracteristiques.sagesse == 'number' &&
        'charisme' in arg.caracteristiques && typeof arg.caracteristiques.charisme == 'number' &&
        'competences' in arg && typeof (arg as IPersonnage).competences?.every(item => typeof item === 'string') &&
        'capacites' in arg && typeof (arg as IPersonnage).capacites?.every(item => typeof item === 'string') &&
        'equipement' in arg && typeof (arg as IPersonnage).equipement?.every(item => typeof item === 'string') &&
        'dateDeCreation' in arg && moment(arg.dateDeCreation as Date).isValid()
    );
}
  
// **** Export **** //
export default model<IPersonnage>('Personnage', PersonnageSchema)
