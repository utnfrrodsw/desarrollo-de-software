// Representa un club tal como lo devuelve la API (GET /api/clubs).
// El id lo genera la base, por eso está presente sólo en lectura.
// Los campos opcionales viajan siempre: con valor o en null.
export interface Club {
  id: number
  name: string
  logoUrl: string | null
  description: string | null
  foundedYear: number | null
}

// Datos que se envían al crear (POST /api/clubs).
// Sin id: todavía no existe el registro.
// Acá los campos sí son opcionales: omitirlos deja el valor sin tocar,
// mandar null lo borra. El backend distingue los dos casos.
export type CreateClubDto = {
  name: string
  logoUrl?: string | null
  description?: string | null
  foundedYear?: number | null
}

// Datos que se envían al editar (PUT /api/clubs/:id).
// El backend acepta name opcional, por eso Partial.
export type UpdateClubDto = Partial<CreateClubDto>
