import { Cascade, Collection, ManyToMany, Property } from "@mikro-orm/core";
import { Cliente } from "../cliente/cliente.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

export class Inmobiliaria extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  direccion!: string;

  @Property({ nullable: false })
  telefono!: string;

  @ManyToMany(() => Cliente, cliente => cliente.inmobiliarias, { cascade: [Cascade.ALL] })
  clientes = new Collection<Cliente>(this);
}