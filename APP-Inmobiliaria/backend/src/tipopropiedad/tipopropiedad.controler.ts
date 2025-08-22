import { Request, Response, NextFunction } from 'express'
import { TipoPropiedadRepository } from './tipopropiedad.repository.js'
import { TipoPropiedad } from './tipopropiedad.entity.js'

const repository = new TipoPropiedadRepository()

function sanitizeTipoPropiedadInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    id: req.body.id
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
  const tipoPropiedad = repository.findOne({ id })
  if (!tipoPropiedad) {
    return res.status(404).send({ message: 'Tipo Propiedad not found' })
  }
  res.json({ data: tipoPropiedad })
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const tipoPropiedadInput = new TipoPropiedad(
    input.nombre,
    input.descripcion,
    input.estado,
    input.id
  )
  

  const tipoPropiedad = repository.add(tipoPropiedadInput)
  return res.status(201).send({ message: 'tipoPropiedad created', data: tipoPropiedad })
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id
  const tipoPropiedad = repository.update(req.body.sanitizedInput)

  if (!tipoPropiedad) {
    return res.status(404).send({ message: 'tipoPropiedad not found' })
  }

  return res.status(200).send({ message: 'tipoPropiedad updated successfully', data: tipoPropiedad })
}

function remove(req: Request, res: Response) {
  const id = req.params.id
  const tipoPropiedad = repository.delete({ id })

  if (!tipoPropiedad) {
    res.status(404).send({ message: 'Tipo Propiedad not found' })
  } else {
    res.status(200).send({ message: 'Tipo Propiedad deleted successfully' })
  }
}

export { sanitizeTipoPropiedadInput, findAll, findOne, add, update, remove }
