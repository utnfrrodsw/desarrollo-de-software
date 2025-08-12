import { MikroORM } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'app',
  clientUrl: 'mysql://dsw:dsw@localhost:3306/app',
  highlighter: new SqlHighlighter(),
  debug: true,
  //generamos nuestro schema
  schemaGenerator: {
    //NUNCA en produccion
    disableForeignKeys: true, //desactiva las llaves foraneas durante el proceso de creacion de base de datos
    createForeignKeyConstraints: true, //crea las llaves foraneas
    ignoreSchema: [], //mantener el schema de la base de datos, que no la borre, aunque no la vamos a utilizar
  },
})

export const syncSchema = async () => {
  //usamos el schema generator que nos brinda typeorm
  const generator = orm.getSchemaGenerator()
  /*   
  await generator.dropSchema()
  await generator.createSchema()
  */
 //esta funcion genera la base dde datos, y si existe va a generar cambios
  await generator.updateSchema()
}
