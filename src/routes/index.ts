import { Router, Request, Response, NextFunction } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import PersonnagesRoute from './PersonnageRoute';
import Personnage from '@src/models/Personnage';
import HttpStatusCodes from '@src/common/HttpStatusCodes';



// **** Variables **** //

const apiRouter = Router(),
validate = jetValidator();

// ** Validation d'un animal ** //
function ValidatePersonnage(req: Request, res: Response, next: NextFunction) {
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Personnage requis' })
      .end();
    return;
  }

  if (req.body.personnage === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Personnage requis' })
      .end();
    return;
  }

  const nouveauPersonnage = new Personnage(req.body.personnage);
  const error = nouveauPersonnage.validateSync();
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// ** Add UserRouter ** //

// Init router
const personnageRouter = Router();

// Get all users
personnageRouter.get(Paths.Personnages.GetAll, PersonnagesRoute.getAll);
personnageRouter.get(Paths.Personnages.GetOne, PersonnagesRoute.getOne);
personnageRouter.get(Paths.Personnages.GetByNiveau, PersonnagesRoute.getByNiveau);
personnageRouter.get(Paths.Personnages.orderByDate, PersonnagesRoute.orderByDate);
personnageRouter.post(Paths.Personnages.Add, PersonnagesRoute.add);
personnageRouter.put(Paths.Personnages.Update, PersonnagesRoute.update);
personnageRouter.delete(Paths.Personnages.Delete, PersonnagesRoute.delete);

// Add UserRouter
apiRouter.use(Paths.Personnages.Base, personnageRouter);


// **** Export default **** //

export default apiRouter;
