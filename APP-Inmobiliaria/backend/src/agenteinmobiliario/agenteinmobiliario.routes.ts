import { Router } from 'express';
import {
  sanitizeAgenteInput,
  findAll,
  findOne,
  add,
  update,
  remove
} from './agenteinmobiliario.controler.js';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', sanitizeAgenteInput, add);
router.put('/:id', sanitizeAgenteInput, update);
router.delete('/:id', remove);

export { router as agenteinmobiliarioRouter };
