import { Request, Response, NextFunction } from 'express'
import { Inmobiliaria } from './inmobiliaria.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeInmobiliariaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
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

async function findAll(req: Request, res: Response) {
  try {
    const inmobiliarias = em.find(Inmobiliaria, {})
    res.status(200).json({ message: 'found all inmobiliarias', data: inmobiliarias })
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const inmobiliaria = await em.findOneOrFail(Inmobiliaria, { id: Number(id) })
    res.status(200).json({ message: 'found inmobiliaria', data: inmobiliaria })
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const cliente = em.create(Inmobiliaria, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'inmobiliaria created', data: cliente })
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const inmobiliariaToUpdate = await em.findOneOrFail(Inmobiliaria, { id: Number(id) })
    em.assign(inmobiliariaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'inmobiliaria updated', data: inmobiliariaToUpdate })
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const inmobiliaria = await em.findOneOrFail(Inmobiliaria, { id: Number(id) })
    await em.removeAndFlush(inmobiliaria)
    res.status(200).json({ message: 'inmobiliaria deleted' })
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeInmobiliariaInput, findAll, findOne, add, update, remove }
