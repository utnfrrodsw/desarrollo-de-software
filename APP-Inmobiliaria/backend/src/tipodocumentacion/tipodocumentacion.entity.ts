import {Entity, ManyToMany, Property, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Cliente } from "../cliente/cliente.entity.js";


export class TipoDocumentacion extends BaseEntity {
    @Property({ nullable: false })
    nombre!: string;

    @Property({ nullable: false })
    descripcion!: string;

    @Property({ nullable: false })
    fechaVencimiento!: Date;

    /*@Property({ nullable: false })
    archivoURL!: string;*/

    @ManyToMany(() => Cliente, cliente => cliente.documentaciones, { cascade: [Cascade.ALL] })
    clientes = new Collection<Cliente>(this);
}