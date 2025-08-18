import { Router } from 'express';
import {
  sanitizeAgenteInput,
  findAll,
  findOne,
  add,
  update,
  remove
} from './agenteinmobiliario.controller.js';

export const agenteinmobiliarioRouter = Router();

agenteinmobiliarioRouter.get('/', findAll);
agenteinmobiliarioRouter.get('/:id', findOne);
agenteinmobiliarioRouter.post('/', sanitizeAgenteInput, add);
agenteinmobiliarioRouter.put('/:id', sanitizeAgenteInput, update);
agenteinmobiliarioRouter.delete('/:id', remove);
