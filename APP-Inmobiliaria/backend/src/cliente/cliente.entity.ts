import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Cliente extends BaseEntity {
    @Property({nullable: false})
    nombre!:string

    @Property({nullable: false})
    apellido!:string

    @Property({nullable: false})
    mail!:string

    @Property({nullable: false})
    telefono!:string

}
    
    /*constructor(
        public nombre: string,
        public apellido: string,
        public mail: string,
        public telefono: string,
        public id: string
    ){}}
        */