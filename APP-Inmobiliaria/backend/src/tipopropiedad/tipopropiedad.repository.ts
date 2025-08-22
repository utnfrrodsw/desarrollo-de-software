import { Repository } from '../shared/repository.js'
import { TipoPropiedad } from './tipopropiedad.entity.js'

const tipoPropiedades = [
  new TipoPropiedad(
    'Casa',
    'Una casa espaciosa',
    'disponible',
    '1'
  ),
]

export class TipoPropiedadRepository implements Repository<TipoPropiedad> {
  public findAll(): TipoPropiedad[] | undefined {
    return tipoPropiedades
  }

  public findOne(item: { id: string }): TipoPropiedad | undefined {
    return tipoPropiedades.find((tipoPropiedad) => tipoPropiedad.id === item.id)
  }

  public add(item: TipoPropiedad): TipoPropiedad | undefined {
    tipoPropiedades.push(item)
    return item
  }

  public update(item: TipoPropiedad): TipoPropiedad | undefined {
    const tipoPropiedadIdx = tipoPropiedades.findIndex((tipoPropiedad) => tipoPropiedad.id === item.id)

    if (tipoPropiedadIdx !== -1) {
      tipoPropiedades[tipoPropiedadIdx] = { ...tipoPropiedades[tipoPropiedadIdx], ...item }
    }
    return tipoPropiedades[tipoPropiedadIdx]
  }

  public delete(item: { id: string }): TipoPropiedad | undefined {
    const tipoPropiedadIdx = tipoPropiedades.findIndex((tipoPropiedad) => tipoPropiedad.id === item.id)

    if (tipoPropiedadIdx !== -1) {
      const deletedTipoPropiedad = tipoPropiedades[tipoPropiedadIdx]
      tipoPropiedades.splice(tipoPropiedadIdx, 1)
      return deletedTipoPropiedad
    }
  }
}
