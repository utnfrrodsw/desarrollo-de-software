import { Repository } from '../shared/repository.js'
import { Inmobiliaria } from './inmobiliaria.entity.js'

const inmobiliarias = [
  new Inmobiliaria(
    '30462950917',
    'Inmobiliaria s.r.l',
    'Mendoza 1173',
    'inmboliariasrl@gmail.com',
    '+54 341 1234567'
  ),
]

export class InmobiliariaRepository implements Repository<Inmobiliaria> {
  public findAll(): Inmobiliaria[] | undefined {
    return inmobiliarias
  }

  public findOne(item: { id: string }): Inmobiliaria | undefined {
    return inmobiliarias.find((inmobiliaria) => inmobiliaria.cuit === item.id)
  }

  public add(item: Inmobiliaria): Inmobiliaria | undefined {
    inmobiliarias.push(item)
    return item
  }

  public update(item: Inmobiliaria): Inmobiliaria | undefined {
    const inmobiliariaIdx = inmobiliarias.findIndex((inmobiliaria) => inmobiliaria.cuit === item.cuit)

    if (inmobiliariaIdx !== -1) {
      inmobiliarias[inmobiliariaIdx] = { ...inmobiliarias[inmobiliariaIdx], ...item }
    }
    return inmobiliarias[inmobiliariaIdx]
  }

  public delete(item: { id: string }): Inmobiliaria | undefined {
    const inmobiliariaIdx = inmobiliarias.findIndex((inmobiliaria) => inmobiliaria.cuit === item.id)

    if (inmobiliariaIdx !== -1) {
      const deletedInmobiliaria = inmobiliarias[inmobiliariaIdx]
      inmobiliarias.splice(inmobiliariaIdx, 1)
      return deletedInmobiliaria
    }
  }
}
