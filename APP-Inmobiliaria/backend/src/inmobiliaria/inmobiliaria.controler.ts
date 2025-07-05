import { Request, Response, NextFunction } from 'express'
import { InmobiliariaRepository } from './inmobiliaria.repository.js'
import { Inmobiliaria } from './inmobiliaria.entity.js'

const repository = new InmobiliariaRepository()

function sanitizeInmobiliariaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    cuit: req.body.cuit,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    email: req.body.email,
    telefono: req.body.telefono,
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
  const id = req.params.id
  const inmobiliaria = repository.findOne({ id })
  if (!inmobiliaria) {
    return res.status(404).send({ message: 'inmobiliaria not found' })
  }
  res.json({ data: inmobiliaria })
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const inmobiliariaInput = new Inmobiliaria(
    input.cuit,
    input.nombre,
    input.direccion,
    input.email,
    input.telefono
  )

  const inmobiliaria = repository.add(inmobiliariaInput)
  return res.status(201).send({ message: 'inmobiliaria created', data: inmobiliaria })
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id
  const inmobiliaria = repository.update(req.body.sanitizedInput)

  if (!inmobiliaria) {
    return res.status(404).send({ message: 'inmobiliaria not found' })
  }

  return res.status(200).send({ message: 'inmobiliaria updated successfully', data: inmobiliaria })
}

function remove(req: Request, res: Response) {
  const id = req.params.id
  const inmobiliaria = repository.delete({ id })

  if (!inmobiliaria) {
    res.status(404).send({ message: 'inmobiliaria not found' })
  } else {
    res.status(200).send({ message: 'inmobiliaria deleted successfully' })
  }
}

export { sanitizeInmobiliariaInput, findAll, findOne, add, update, remove }
