import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './agenteinmobiliario.controller.js';

export const agenteinmobiliarioRouter = Router();

agenteinmobiliarioRouter.get('/', findAll);
agenteinmobiliarioRouter.get('/:id', findOne);
agenteinmobiliarioRouter.post('/', add);
agenteinmobiliarioRouter.put('/:id', update);
agenteinmobiliarioRouter.delete('/:id', remove);
