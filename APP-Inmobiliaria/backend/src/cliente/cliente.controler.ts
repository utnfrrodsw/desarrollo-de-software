import { Request, Response, NextFunction } from 'express'
import { Cliente } from './cliente.entity.js'
import { orm } from '../shared/db/orm.js'


const em = orm.em

function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    telefono: req.body.telefono,
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

async function findAll(req: Request, res: Response) {
  try {
    const clientes = await em.find(
      Cliente,
      {}
    )
    res.status(200).json({ message: 'found all clientes', data: clientes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const cliente = await em.findOneOrFail(
      Cliente,
      { id: Number(id) }
    )
    res.status(200).json({ message: 'found cliente', data: cliente })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function add(req: Request, res: Response) {
  try {
    const cliente = em.create(Cliente, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'cliente created', data: cliente })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const clienteToUpdate = await em.findOneOrFail(Cliente, { id: Number(id) })
    em.assign(clienteToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'cliente updated', data: clienteToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const cliente = em.getReference(Cliente, Number(id))
    await em.removeAndFlush(cliente)
    res.status(200).json({ message: 'cliente deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeClienteInput, findAll, findOne, add, update, remove }
