import { Router } from 'express';
import {
  sanitizeTipoDocumentacionInput,
  findAll,
  findOne,
  add,
  update,
  remove
} from './tipodocumentacion.controler.js';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', sanitizeTipoDocumentacionInput, add);
router.put('/:id', sanitizeTipoDocumentacionInput, update);
router.delete('/:id', remove);

export { router as tipoDocumentacionRouter };
