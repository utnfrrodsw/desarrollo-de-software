import { Router } from 'express'
import { sanitizeTipoPropiedadInput, findAll, findOne, add, update, remove } from './tipopropiedad.controler.js'

export const tipopropiedadRouter = Router()

tipopropiedadRouter.get('/', findAll)
tipopropiedadRouter.get('/:id', findOne)
tipopropiedadRouter.post('/', sanitizeTipoPropiedadInput, add)
tipopropiedadRouter.put('/:id', sanitizeTipoPropiedadInput, update)
tipopropiedadRouter.patch('/:id', sanitizeTipoPropiedadInput, update)
tipopropiedadRouter.delete('/:id', remove)
tipopropiedadRouter.delete('/', (req, res) => {
  res.status(405).send('Method Not Allowed')
})