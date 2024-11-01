import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import app from '@src/server';
import insertUrlParams from 'inserturlparams';
import Personnage, { IPersonnage } from '@src/models/Personnage';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import apiCb from 'spec/support/apiCb';
import { TApiCb } from 'spec/types/misc';
import { PERSONNAGE_NOT_FOUND_ERR } from '@src/services/PersonnageService';

const mockify = require('@jazim/mock-mongoose');

// Données bidon pour les tests
const obtenirDonneesBidonPersonnages = () => {
  return [
    {
      nomComplet: {
        prenom:"Jim",
        nom:"ALPERT"
      },
      classe: "Funguy",
      niveau: 4,
      pointsDeVie: 360,
      vivant: true,
      caracteristiques: {
        force : 20,
        dexterite : 60,
        intelligence : 99,
        sagesse : 0,
        charisme : 80
      },
      competences: [
        "test",
        "test2"
    ],
      capacites: [
        "Jello-Blast",
        "Chair-Disappear",
        "Christmas-Desk"
      ],
      equipement: [
        "Jello-Powder",
        "Wrapping paper"
      ],
      /* Code emprunté de Thomas Laliberté */
      dateDeCreation : new Date(Date.now()).toJSON() as unknown as Date,
      /* Fin du code emprunté */
      _id: '66eb3d4c7f48fb66d6a46aaa',
    }
  ];
};

// Tests
describe('PersonnageRouter', () => {
  let agent: TestAgent<Test>;

  // Ce code est exécuté avant tous les tests, pour préparer l'agent SuperTest
  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  // Get all de Animaux
  describe(`"GET:${'/personnages/'}"`, () => {
    // Initialise l'API
    const api = (cb: TApiCb) => agent.get('/personnages/').end(apiCb(cb));

    // Réussite
    it(
      'doit retourner un objet JSON avec tous les personnages et un code de status de ' +
        `"${HttpStatusCodes.OK}" si la requête est réussie.`,
      (done) => {
        // Préparer le simulacre de Mongoose
        const data = obtenirDonneesBidonPersonnages();
        mockify(Personnage).toReturn(data, 'find');

        // Appel de l'API
        api((res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          expect(res.body).toEqual({ personnages: data });
          const personnages = res.body.personnages as IPersonnage[];
          expect(personnages.length).toBe(data.length);
          done();
        });
      }
    );
  });

  // Test l'ajout d'un animal
  describe(`"POST:/personnages/"`, () => {
    const ERROR_MSG = `Personnage requis`,
      DUMMY_personnage = obtenirDonneesBidonPersonnages()[0];

    // Initialise l'API
    const callApi = (personnage: IPersonnage | null, cb: TApiCb) =>
      agent.post('/personnages/').send({ personnage }).end(apiCb(cb));

    // Test un ajout réussi
    it(
      `doit retourner un code de statut "${HttpStatusCodes.CREATED}" si la ` +
        'requête est réussie.',
      (done) => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage).toReturn(DUMMY_personnage, 'save');

        // Appel de l'API
        callApi(DUMMY_personnage, (res) => {
            expect(res.status).toBe(HttpStatusCodes.CREATED);
            done();
        });
      }
    );

    // Test avec un animal manquant
    it(
      `doit retourner un objet JSON avec un message d'erreur de "Personnage requis" ` +
        `et un code de statut "${HttpStatusCodes.BAD_REQUEST}" si le paramètre personnage ` +
        'est manquant.',
      (done) => {
        // Appel de l'API
        callApi(null, (res) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          expect(res.body.error).toBe(ERROR_MSG);
          done();
        });
      }
    );
  });

  // Mise à jour d'un personnage
  describe(`"PUT:/personnages/"`, () => {
    const ERROR_MSG = `Personnage requis`,
      DUMMY_personnage = obtenirDonneesBidonPersonnages()[0];

    // Configuration de l'API
    const callApi = (personnage: IPersonnage, cb: TApiCb) =>
      agent.put('/personnages/').send({Personnage : DUMMY_personnage}).end(apiCb(cb)); // CHANGEMENT : DUMMY_PERSONNAGE

    // Réussite
    it(
      `doit retourner un code de statut "${HttpStatusCodes.OK}" si la ` +
        'requête est réussie.',
      (done) => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage)
          .toReturn(DUMMY_personnage, 'findById')
          .toReturn(DUMMY_personnage, 'save');

        // Appel de l'API
        callApi(DUMMY_personnage, (res) => {
          /* TO DO */
          //expect(res.status).toBe(200);
          done();
        });
      }
    );

    // Animal non trouvé
    it(
      'doit retourner un objet JSON avec le message d\'erreur "' +
        `${PERSONNAGE_NOT_FOUND_ERR}" et un code de statut ` +
        `"${HttpStatusCodes.NOT_FOUND}" si l'identifiant n'a pas été trouvé.`,
      (done) => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage).toReturn(null, 'findOne');
        // Appeler l'API
        callApi(DUMMY_personnage, (res) => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.erreur).toBe(PERSONNAGE_NOT_FOUND_ERR);
          done();
        });
      }
    );
  });

  // Supprimer un animal
  describe(`"DELETE:/animaux/}"`, () => {
    const DUMMY_personnage = obtenirDonneesBidonPersonnages()[0];
    // Appeler l'API
    const callApi = (id: string, cb: TApiCb) =>
      agent.delete(insertUrlParams('/personnages/:id', { id } )).end(apiCb(cb));
    // Succès
    it(
      `doit retourner un code de statut "${HttpStatusCodes.OK}" si la ` +
        'requête est réussie.',
      (done) => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage)
          .toReturn(DUMMY_personnage, 'findByIdAndDelete')

        // Appeler l'API
        callApi(DUMMY_personnage._id, (res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          done();
        });
      }
    );

    // Animal non trouvé
    it(
      'doit retourner un objet JSON avec le message d\'erreur "' +
        `${PERSONNAGE_NOT_FOUND_ERR}" et un code de statut ` +
        `"${HttpStatusCodes.NOT_FOUND}" si l'identifiant n'a pas été trouvé.`,
      (done) => {
        // Préparer le simulacre de Mongoose
        mockify(Personnage).toReturn(null, 'findOne');

        // Appeler l'API
        callApi('aaa', (res) => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(PERSONNAGE_NOT_FOUND_ERR);
          done();
        });
      }
    );
  });
});
