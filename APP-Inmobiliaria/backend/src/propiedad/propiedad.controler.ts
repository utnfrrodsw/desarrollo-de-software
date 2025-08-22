import { Request, Response, NextFunction } from 'express';
import { PropiedadRepository } from './propiedad.repository.js';
import { Propiedad } from './propiedad.entity.js';
import { InmobiliariaRepository } from '../inmobiliaria/inmobiliaria.repository.js';

const repository = new PropiedadRepository();
const inmobiliariaRepository = new InmobiliariaRepository();

function sanitizePropiedadInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    direccion: req.body.direccion,
    precio: req.body.precio,
    estado: req.body.estado,
    tipoPropiedadId: req.body.tipoPropiedadId,
    inmobiliariaCuit: req.body.inmobiliariaCuit,
  };
  next();
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const propiedad = repository.findOne({ id });
  if (!propiedad) return res.status(404).send({ message: 'Propiedad not found' });
  res.json({ data: propiedad });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  if (!inmobiliariaRepository.findOne({ id: input.inmobiliariaCuit })) {
    return res.status(400).send({ message: 'Inmobiliaria no existe' });
  }
  const propiedad = new Propiedad(
    Math.random().toString(36).substring(2, 9),
    input.direccion,
    input.precio,
    input.estado,
    input.tipoPropiedadId,
    input.inmobiliariaCuit
  );
  repository.add(propiedad);
  return res.status(201).send({ message: 'Propiedad created', data: propiedad });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const propiedad = repository.update(req.body.sanitizedInput);
  if (!propiedad) return res.status(404).send({ message: 'Propiedad not found' });
  return res.status(200).send({ message: 'Propiedad updated', data: propiedad });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const propiedad = repository.delete({ id });
  if (!propiedad) return res.status(404).send({ message: 'Propiedad not found' });
  res.status(200).send({ message: 'Propiedad deleted' });
}

export { sanitizePropiedadInput, findAll, findOne, add, update, remove };
