import HttpStatusCodes from '@src/common/HttpStatusCodes';
import PersonnageService from '@src/services/PersonnageService';
import { IPersonnage, isPersonnage } from '@src/models/Personnage';
import { IReq, IRes } from './common/types';
import { PERSONNAGE_NOT_FOUND_ERR } from '@src/services/PersonnageService';
import check from './common/check';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  var personnages = await PersonnageService.getAll();
  if(personnages.length < 1){
    return res.status(HttpStatusCodes.NO_CONTENT).end();
  }
  return res.status(HttpStatusCodes.OK).json({ personnages });
}

/**
 * Get all users.
 */
async function getByNiveau(req: IReq, res: IRes) {
  const niveau = Number(req.params.niveau);
  if(niveau > 0){
    var personnages = await PersonnageService.getByNiveau(niveau);
    if(personnages.length < 1){
      return res.status(HttpStatusCodes.NO_CONTENT).end();
    }
    return res.status(HttpStatusCodes.OK).json({ personnages });
  }
  return res.status(HttpStatusCodes.BAD_REQUEST).end();
}

/**
 * Get all users.
 */
async function orderByDate(req: IReq, res: IRes) {
  const ordre = String(req.params.ordre);
  if(ordre == 'asc' || ordre == 'desc'){
    var personnages = await PersonnageService.orderByDate(ordre);
    return res.status(HttpStatusCodes.OK).json(personnages);
  }
  return res.status(HttpStatusCodes.BAD_REQUEST).end();
}

/**
 * Get by ID.
 */
async function getOne(req: IReq, res: IRes) {
  var id = String(req.params.id);
  var personnage = await PersonnageService.getOne(id);
  if(personnage == null){
    return res.status(HttpStatusCodes.NOT_FOUND).end();
  }
  return res.status(HttpStatusCodes.OK).json({ personnage });
}

/**
 * Add one Personnage.
 */
async function add(req: IReq, res: IRes) {
  const personnage = req.body.personnage;
  if(!isPersonnage(personnage)){
    return res.status(HttpStatusCodes.BAD_REQUEST).json(({ error: 'Personnage requis' }));
  }
  await PersonnageService.addOne(personnage);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one Personnage.
 */
async function update(req: IReq, res: IRes) {
  const personnage : IPersonnage = check.isValid(req.body, 'Personnage', isPersonnage);
  const resultat = await PersonnageService.updateOne(personnage)
  if(resultat !== PERSONNAGE_NOT_FOUND_ERR){
    return res.status(HttpStatusCodes.OK).end();
  }
  return res.status(HttpStatusCodes.NOT_FOUND).json({ erreur : PERSONNAGE_NOT_FOUND_ERR});
}

/**
 * Delete one Personnage.
 */
async function delete_(req: IReq, res: IRes) {
  const id = check.isStr(req.params, 'id');
  const personnage = await PersonnageService.delete(id);
  return res.status(HttpStatusCodes.OK).json(personnage);
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  getByNiveau,
  orderByDate,
  add,
  update,
  delete: delete_,
} as const;
