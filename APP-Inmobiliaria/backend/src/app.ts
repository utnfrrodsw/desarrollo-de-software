import express from 'express'
import { clienteRouter } from './cliente/cliente.routes.js'
import { tipopropiedadRouter } from './tipopropiedad/tipopropiedad.routes.js'
import { inmobiliariaRouter } from './inmobiliaria/inmobiliaria.routes.js'
import { tipoDocumentacionRouter } from './tipodocumentacion/tipodocumentacion.routes.js'
import { propiedadRouter } from './propiedad/propiedad.routes.js'
import { agenteinmobiliarioRouter } from './agenteinmobiliario/agenteinmobiliario.routes.js'

const app = express()
app.use(express.json())

app.use('/api/clientes', clienteRouter)
app.use('/api/tipopropiedades', tipopropiedadRouter)
app.use('/api/inmobiliarias', inmobiliariaRouter)
app.use('/api/tipodocumentaciones', tipoDocumentacionRouter)
app.use('/api/propiedades', propiedadRouter)
app.use('/api/agentes', agenteinmobiliarioRouter)


app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
