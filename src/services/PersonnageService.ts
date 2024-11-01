import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import PersonnageRepo from '@src/repos/PersonnageRepo';
import Personnage, { IPersonnage } from '@src/models/Personnage';


// **** Variables **** //

export const PERSONNAGE_NOT_FOUND_ERR = 'Personnage non-trouvé';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IPersonnage[]> {
  return PersonnageRepo.getAll();
}

/**
 * Get all users.
 */
function getOne(id : string): Promise<IPersonnage | null> {
  return PersonnageRepo.getOne(id);
}

/**
 * Get all users.
 */
function getByNiveau(niveau : number): Promise<IPersonnage[]> {
  return PersonnageRepo.getByNiveau(niveau);
}

/**
 * Get all users.
 */
function orderByDate(ordre : string): Promise<IPersonnage[]> {
  return PersonnageRepo.orderByDate(ordre);
}
/**
 * Add one user.
 */
function addOne(personnage: IPersonnage): Promise<void> {
  return PersonnageRepo.add(personnage);
}

/**
 * Update one user.
 */
async function updateOne(personnage: IPersonnage): Promise<void | String> {
  const personneUpdate = await Personnage.findById(personnage._id);
  if(personneUpdate !== null){
    return PersonnageRepo.update(personnage);
  }
  return PERSONNAGE_NOT_FOUND_ERR;
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await PersonnageRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONNAGE_NOT_FOUND_ERR,
    );
  }
  // Delete user
  await PersonnageRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getByNiveau,
  orderByDate,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
