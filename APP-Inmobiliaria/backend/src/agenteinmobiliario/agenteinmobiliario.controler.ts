import { Request, Response, NextFunction } from 'express';
import { AgenteInmobiliarioRepository } from './agenteinmobiliario.repository.js';
import { AgenteInmobiliario } from './agenteinmobiliario.entity.js';
import { InmobiliariaRepository } from '../inmobiliaria/inmobiliaria.repository.js';

const repository = new AgenteInmobiliarioRepository();
const inmobiliariaRepository = new InmobiliariaRepository();

function sanitizeAgenteInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    inmobiliariaCuit: req.body.inmobiliariaCuit,
  };
  next();
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const agente = repository.findOne({ id });
  if (!agente) return res.status(404).send({ message: 'AgenteInmobiliario not found' });
  res.json({ data: agente });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  if (!inmobiliariaRepository.findOne({ id: input.inmobiliariaCuit })) {
    return res.status(400).send({ message: 'Inmobiliaria no existe' });
  }
  const agente = new AgenteInmobiliario(
    Math.random().toString(36).substring(2, 9),
    input.nombre,
    input.inmobiliariaCuit
  );
  repository.add(agente);
  return res.status(201).send({ message: 'AgenteInmobiliario created', data: agente });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const agente = repository.update(req.body.sanitizedInput);
  if (!agente) return res.status(404).send({ message: 'AgenteInmobiliario not found' });
  return res.status(200).send({ message: 'AgenteInmobiliario updated', data: agente });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const agente = repository.delete({ id });
  if (!agente) return res.status(404).send({ message: 'AgenteInmobiliario not found' });
  res.status(200).send({ message: 'AgenteInmobiliario deleted' });
}

export { sanitizeAgenteInput, findAll, findOne, add, update, remove };
