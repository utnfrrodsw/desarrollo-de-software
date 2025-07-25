import { AgenteInmobiliario } from './agenteinmobiliario.entity.js';

export class AgenteInmobiliarioRepository {
  private items: AgenteInmobiliario[] = [];

  findAll() {
    return this.items;
  }

  findOne({ id }: { id: string }) {
    return this.items.find(item => item.id === id);
  }

  add(agente: AgenteInmobiliario) {
    this.items.push(agente);
    return agente;
  }

  update(data: Partial<AgenteInmobiliario> & { id: string }) {
    const index = this.items.findIndex(item => item.id === data.id);
    if (index === -1) return null;
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }

  delete({ id }: { id: string }) {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;
    const deleted = this.items.splice(index, 1)[0];
    return deleted;
  }
}
