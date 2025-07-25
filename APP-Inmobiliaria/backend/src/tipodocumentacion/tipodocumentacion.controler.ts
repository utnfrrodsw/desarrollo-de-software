import { Request, Response, NextFunction } from 'express';
import { TipoDocumentacionRepository } from './tipodocumentacion.repository.js';
import { TipoDocumentacion } from './tipodocumentacion.entity.js';

const repository = new TipoDocumentacionRepository();

function sanitizeTipoDocumentacionInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };
  next();
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const tipo = repository.findOne({ id });
  if (!tipo) return res.status(404).send({ message: 'TipoDocumentacion not found' });
  res.json({ data: tipo });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const tipo = new TipoDocumentacion(
    Math.random().toString(36).substring(2, 9),
    input.nombre,
    input.descripcion
  );
  repository.add(tipo);
  return res.status(201).send({ message: 'TipoDocumentacion created', data: tipo });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const tipo = repository.update(req.body.sanitizedInput);
  if (!tipo) return res.status(404).send({ message: 'TipoDocumentacion not found' });
  return res.status(200).send({ message: 'TipoDocumentacion updated', data: tipo });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const tipo = repository.delete({ id });
  if (!tipo) return res.status(404).send({ message: 'TipoDocumentacion not found' });
  res.status(200).send({ message: 'TipoDocumentacion deleted' });
}

export { sanitizeTipoDocumentacionInput, findAll, findOne, add, update, remove };
