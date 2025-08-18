import { orm } from '../shared/db/orm.js';
import { AgenteInmobiliario } from './agenteinmobiliario.entity.js';
import { Inmobiliaria } from '../inmobiliaria/inmobiliaria.entity.js';

export class AgenteInmobiliarioRepository {
  private em = orm.em;

  async findAll() {
    return await this.em.find(AgenteInmobiliario, {}, { populate: ['inmobiliaria'] });
  }

  async findOne(id: number) {
    return await this.em.findOne(AgenteInmobiliario, { id }, { populate: ['inmobiliaria'] });
  }

  async add(nombre: string, inmobiliariaCuit: string) {
    const inmobiliaria = await this.em.findOneOrFail(Inmobiliaria, { cuit: inmobiliariaCuit });
    const agente = this.em.create(AgenteInmobiliario, { nombre, inmobiliaria });
    await this.em.persistAndFlush(agente);
    return agente;
  }

  async update(id: number, data: Partial<{ nombre: string; inmobiliariaCuit: string }>) {
    const
