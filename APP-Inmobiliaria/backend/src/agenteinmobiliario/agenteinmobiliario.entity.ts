export class AgenteInmobiliario {
  constructor(
    public id: string,
    public nombre: string,
    public inmobiliariaCuit: string // Relación con inmobiliaria
  ) {}
}

//renombrar archivo  agenteinmobiliario.entity.ts a agenteinmobiliario.mem.ts
//borrar el dist
