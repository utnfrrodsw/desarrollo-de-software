# PROPOSAL TP DSW



## MIEMBROS
* 50252 - Tomás Nahuel Suárez
* 52960 - Lautaro Goyoaga
* 52977 - Felipe Bentancour
* 50839 - Paloma Tejedor



## REPOSITORIES
* [ Frontend app ]
* [ Backentd app ]



## Vision General

### '...'

Nuestra agencia inmobiliaria se especializa en alquileres de propiedades, ofreciendo servicios integrales tanto para propietarios como para inquilinos. Operamos en diversas zonas de la ciudad y sus alrededores, gestionando una amplia variedad de inmuebles que incluyen departamentos, casas, oficinas y locales comerciales. Nos encargamos de todo el proceso de alquiler: desde la publicación de las propiedades, la atención de consultas, la organización de visitas y la selección de posibles inquilinos, hasta la redacción y firma de contratos de arrendamiento.

A través de un sistema en línea moderno y fácil de usar, los clientes pueden acceder a un catálogo actualizado de propiedades disponibles, filtrar las publicaciones según sus necesidades y solicitar visitas. Los propietarios pueden confiar en nosotros para la gestión completa de sus inmuebles, incluyendo la cobranza mensual del alquiler, la administración de contratos y la atención de solicitudes por parte de los inquilinos.



## MODELO DE OBJETOS
*  <img width="702" height="572" alt="Modelo de objetos APP-Inmobiliaria drawio" src="https://github.com/user-attachments/assets/551c1cf9-2931-407c-994b-514862f835dc" />



## ALCANCE FUNCIONAL

### ALCANCE MINIMO
Requisitos para la regularidad:
|Req|Detail|
|:-|:-|
  |Simple CRUD|1. CRUD-Cliente<br>2. CRUD-TipoPropiedad<br>3. CRUD-Inmobiliaria<br>4. CRUD-TipoDocumentacion|
|Dependent CRUD|1. CRUD-Propiedad {depend on} Inmboliaria<br>2. CRUD-Agente Inmobiliario {depend on} inmobiliaria|
|Listado + Detalle|1. Listado de propiedades filtrado por zona, tipo o inmobiliaria => muestra dirección, precio, estado<br>2. Listado de visitas por cliente o propiedad => muestra fecha, agente, estado => detalle muestra toda la información de la visita|
|CUU / EPIC|1. Reservar una propiedad mediante una seña<br>2. Agendar visita|


### ALCANCE ADICIONAL
Requisitos para AD:
|Req|Detail|
|:-|:-|
|CUU/Epic|1. Registrar un pago de alquiler<br>2. Confirmar alquiler|


### ALCANCE FUNCIONAL ADICIONAL VOLUNTARIO
|Req|Detail|
|:-|:-|
|Listados |1. Listado de propiedades más vistas|
|CUU/Epic|1. Marcar propiedades como favoritas(cliente)<br>2. Búsqueda avanzada de propiedades con múltiples filtros(zona, precio, disponibilidad)|
|Otros|1.Envio notificación automática al usuario previo al vencimiento de su contrato|
