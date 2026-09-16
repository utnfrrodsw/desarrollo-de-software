// Valores iniciales del formulario, separados del componente
// según la convención de la cátedra (Componente.data.ts).
// Al vivir afuera no se recrean en cada render.
// foundedYear arranca como string vacía porque un input controlado
// siempre maneja strings: la conversión a número pasa en el submit.
export const initialClubData = {
  name: '',
  logoUrl: '',
  description: '',
  foundedYear: '',
}

// Un booleano por campo. Cuando pasa a true, el className del input
// aplica la clase de error: el estilizado escucha este estado.
// Sólo los campos que validamos en el front: el formato de la URL
// lo valida el backend y se muestra con un toast.
export const initialClubErrors = {
  name: false,
  foundedYear: false,
}
