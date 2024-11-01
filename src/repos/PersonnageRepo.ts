import Personnage, { IPersonnage } from '@src/models/Personnage';

/**
 * Lire tous les animaux.
 */
async function getAll(): Promise<IPersonnage[]> {
  return Personnage.find();

}

/**
 * Lire tous les animaux.
 */
async function getByNiveau(niveau : number): Promise<IPersonnage[]> {
  return Personnage.find({ niveau: niveau});
}

/**
 * Lire tous les animaux.
 */
async function orderByDate(ordre : string): Promise<IPersonnage[]> {
  /* J'ai demandé à chatgpt comment directement utiliser ma variable ordre, sans avoir à faire deux IF qui vérifie si ordre == 'asc' ou 'desc'. */
  return Personnage.find({}).sort({dateDeCreation: ordre === 'asc' ? 1 : -1});
}

/**
 * Get one user.
 */
async function getOne(id: string): Promise<IPersonnage | null> {
  return Personnage.findById(id);
}

/**
 * Vérifie si le personnage existe.
 */
async function persists(id: string): Promise<boolean> {
  const personnage = await Personnage.findById(id);
  return personnage !== null;
}

/**
 * Add one user.
 */
async function add(personnage: IPersonnage): Promise<void> {
  await Personnage.create(personnage);
}

/**
 * Update a user.
 */
async function update(personnage: IPersonnage): Promise<void> {
  const personneUpdate = await Personnage.findById(personnage._id);

  if(personneUpdate !== null){
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
    await personneUpdate.save();
  }
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  await Personnage.findByIdAndDelete(id)
}


// **** Export default **** //

export default {
  getOne,
  getByNiveau,
  orderByDate,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
