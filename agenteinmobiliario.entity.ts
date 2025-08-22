import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Inmobiliaria } from '../inmobiliaria/inmobiliaria.entity.js';

@Entity()
export class AgenteInmobiliario {
  @PrimaryKey()
  id!: number;

  @Property()
  nombre!: string;

  @ManyToOne(() => Inmobiliaria)
  inmobiliaria!: Inmobiliaria;
}
