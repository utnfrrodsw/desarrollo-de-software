import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'

import Button from '../../shared/button/Button'
import { errorToast } from '../../../shared/notifications'
import { initialClubData, initialClubErrors } from './ClubForm.data'
import { getClub } from './ClubForm.server'
import type { Club, CreateClubDto } from '../../../types/club'

// El club de la API trae null y number; los inputs controlados manejan
// sólo strings. Esta conversión hace falta al precargar desde el state
// y desde la request, así que vive en un solo lugar.
const clubToForm = (club: Club) => ({
  name: club.name,
  logoUrl: club.logoUrl ?? '',
  description: club.description ?? '',
  foundedYear: club.foundedYear?.toString() ?? '',
})

// Output properties: el formulario no guarda nada por su cuenta,
// avisa hacia arriba y ClubList decide qué hacer con el resultado.
interface ClubFormProps {
  onAdd: (club: CreateClubDto) => void
  onEdit: (id: number, club: CreateClubDto) => void
}

export default function ClubForm({ onAdd, onEdit }: ClubFormProps) {
  const navigate = useNavigate()

  // useParams devuelve los segmentos dinámicos de la URL, siempre string.
  // Si hay :id estamos editando; si no, es un alta.
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  // El state que ClubList mandó en navigate(..., { state: club }).
  // Puede no estar: no sobrevive a un F5 ni a compartir el link.
  const { state } = useLocation()
  const clubFromState = state as Club | null

  // Un solo objeto para todo el formulario, en vez de un useState
  // por campo. El handler genérico de abajo actualiza cualquier campo.
  const [form, setForm] = useState(
    clubFromState ? clubToForm(clubFromState) : initialClubData,
  )
  const [errors, setErrors] = useState(initialClubErrors)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Referencia al nodo real del input. La usamos sólo para el focus():
  // hacer foco es una acción imperativa sobre el DOM y no se puede
  // expresar con una prop en el JSX. El valor sigue viniendo del estado.
  const nameRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  // Fallback: si estamos editando y no llegó el state (F5 o link directo),
  // pedimos el club por su id.
  useEffect(() => {
    if (!isEditing || clubFromState) return

    getClub(id, {
      onSuccess: (club) => setForm(clubToForm(club)),
      onError: (error) => {
        errorToast(error.message)
        navigate('/clubes', { replace: true })
      },
    })
  }, [id, isEditing, clubFromState, navigate])

  // Handler genérico con clave computada: sirve para cualquier campo.
  // Además limpia el error de ese campo, así el borde rojo desaparece
  // apenas el usuario empieza a corregir.
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    attr: keyof typeof form,
  ) => {
    const { value } = event.target

    setForm((prevForm) => ({ ...prevForm, [attr]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [attr]: false }))
  }

  const handleSubmit = (event: FormEvent) => {
    // Sin esto el navegador recarga la página y se pierde el estado.
    event.preventDefault()

    // Validación con la ref: si el campo está vacío, marcamos el error
    // y le devolvemos el foco al usuario para que corrija sin buscar.
    if (!nameRef.current?.value.trim().length) {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }))
      nameRef.current?.focus()
      return
    }

    // El año vacío se manda como null (borrar), no como "": el backend
    // rechaza un string en ese campo. Y validamos que sea entero porque
    // Number("abc") da NaN, que al serializarse a JSON viaja como null
    // y borraría el dato sin que el usuario se entere.
    const typedYear = form.foundedYear.trim()
    const foundedYear = typedYear === '' ? null : Number(typedYear)

    if (foundedYear !== null && !Number.isInteger(foundedYear)) {
      setErrors((prevErrors) => ({ ...prevErrors, foundedYear: true }))
      yearRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    // No navegamos acá: avisamos hacia arriba y ClubList navega recién
    // cuando el servidor confirmó. Si falla (por ej. 409 por nombre
    // duplicado), el usuario se queda en el formulario con el error.
    // El logo y la descripción sí viajan como "": el backend los guarda
    // como null, que es la forma de vaciar un campo opcional.
    const payload: CreateClubDto = {
      name: form.name.trim(),
      logoUrl: form.logoUrl.trim(),
      description: form.description.trim(),
      foundedYear,
    }

    if (isEditing) {
      onEdit(Number(id), payload)
    } else {
      onAdd(payload)
    }

    // Si el guardado falla, el componente sigue montado: liberamos
    // el botón para que pueda reintentar.
    setIsSubmitting(false)
  }

  const handleCancel = () => navigate('/clubes')

  return (
    // noValidate desactiva la validación nativa del navegador. Sin esto,
    // el browser bloquearía el submit antes de que corra handleSubmit
    // y el focus() de la ref nunca se ejecutaría.
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-md rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2 className="text-xl font-bold text-navy">
        {isEditing ? 'Editar club' : 'Nuevo club'}
      </h2>

      <div className="mt-6 flex flex-col gap-1">
        {/* htmlFor + id conectan el label con el input:
            al hacer click en el texto se enfoca el campo. */}
        <label htmlFor="name" className="text-sm font-medium">
          Nombre
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={(event) => handleInputChange(event, 'name')}
          placeholder="Club Atlético Rosario"
          // El className escucha el estado de errores.
          className={`rounded-lg border px-3 py-2 ${
            errors.name ? 'border-brand' : 'border-slate-300'
          }`}
        />
      </div>

      {/* Renderizado condicional: el mensaje sólo existe si hay error. */}
      {errors.name && (
        <p role="alert" className="mt-2 text-sm text-brand">
          El nombre del club es obligatorio.
        </p>
      )}

      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="logoUrl" className="text-sm font-medium">
          URL del logo <span className="text-muted">(opcional)</span>
        </label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          value={form.logoUrl}
          onChange={(event) => handleInputChange(event, 'logoUrl')}
          placeholder="https://ejemplo.com/logo.png"
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción <span className="text-muted">(opcional)</span>
        </label>
        {/* maxLength corta en el mismo límite que valida el backend. */}
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={1000}
          value={form.description}
          onChange={(event) => handleInputChange(event, 'description')}
          placeholder="Breve reseña del club"
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="foundedYear" className="text-sm font-medium">
          Año de fundación <span className="text-muted">(opcional)</span>
        </label>
        <input
          ref={yearRef}
          id="foundedYear"
          name="foundedYear"
          // type="text" en vez de number: las flechas del spinner no aportan
          // (nadie carga un año de a uno) y con foco la rueda del mouse
          // cambiaría el valor al scrollear. inputMode abre el teclado
          // numérico en mobile; la validación real está en handleSubmit.
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={form.foundedYear}
          onChange={(event) => handleInputChange(event, 'foundedYear')}
          placeholder="1930"
          className={`rounded-lg border px-3 py-2 ${
            errors.foundedYear ? 'border-brand' : 'border-slate-300'
          }`}
        />
      </div>

      {errors.foundedYear && (
        <p role="alert" className="mt-2 text-sm text-brand">
          El año de fundación tiene que ser un número entero.
        </p>
      )}

      <div className="mt-6 flex gap-2">
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isEditing ? 'Guardar cambios' : 'Crear club'}
        </Button>
      </div>
    </form>
  )
}
