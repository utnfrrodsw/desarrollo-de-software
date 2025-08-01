import { PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb'

export abstract class BaseEntity {
  @PrimaryKey()
  _id?: ObjectId = new ObjectId()

  @SerializedPrimaryKey()
  id?: string

  /*

  @Property({ type: DateTimeType })
  createdAt? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date()

  */
}
