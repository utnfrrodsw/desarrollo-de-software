import { Router } from 'express';
import {
  sanitizePropiedadInput,
  findAll,
  findOne,
  add,
  update,
  remove
} from './propiedad.controler.js';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', sanitizePropiedadInput, add);
router.put('/:id', sanitizePropiedadInput, update);
router.delete('/:id', remove);

export { router as propiedadRouter };
