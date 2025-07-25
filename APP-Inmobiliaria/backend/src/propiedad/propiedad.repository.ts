import { Propiedad } from './propiedad.entity.js';

export class PropiedadRepository {
  private items: Propiedad[] = [];

  findAll() {
    return this.items;
  }

  findOne({ id }: { id: string }) {
    return this.items.find(item => item.id === id);
  }

  add(propiedad: Propiedad) {
    this.items.push(propiedad);
    return propiedad;
  }

  update(data: Partial<Propiedad> & { id: string }) {
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
