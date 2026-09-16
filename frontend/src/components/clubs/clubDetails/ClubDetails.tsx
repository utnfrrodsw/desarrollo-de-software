import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import Button from '../../shared/button/Button'
import { getClub } from './ClubDetails.server'
import type { Club } from '../../../types/club'

export default function ClubDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { state } = useLocation()
  const clubFromState = state as Club | null

  // Si venimos con el club en el state, arrancamos con el dato puesto
  // y sin loading: no hay request ni parpadeo de carga.
  const [club, setClub] = useState<Club | null>(clubFromState ?? null)
  const [isLoading, setIsLoading] = useState(!clubFromState)
  // Igual que en la tarjeta del listado: si la URL del logo falla,
  // caemos al badge de iniciales.
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    // Ya tenemos el club (o no hay id que pedir): no hace falta la request.
    if (clubFromState || !id) return

    getClub(id, {
      onSuccess: (data) => {
        setClub(data)
        setIsLoading(false)
      },
      // No mostramos toast acá: el bloque de "no encontrado" de abajo
      // ya le explica al usuario qué pasó, sin duplicar el aviso.
      onError: () => setIsLoading(false),
    })
  }, [id, clubFromState])

  if (isLoading) {
    return <p className="text-muted">Cargando club…</p>
  }

  // Segundo estado: el id no existe o falló la conexión.
  // Sin este bloque, el JSX de abajo rompería al leer club.name de null.
  if (!club) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-muted">
          No se encontró información para el club {id}.
        </p>
        <Button variant="secondary" onClick={() => navigate('/clubes')}>
          Volver al listado
        </Button>
      </div>
    )
  }

  return (
    <article className="max-w-md rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-4">
        {club.logoUrl && !logoFailed ? (
          <img
            src={club.logoUrl}
            alt={`Escudo de ${club.name}`}
            onError={() => setLogoFailed(true)}
            className="h-16 w-16 shrink-0 rounded-full object-contain"
          />
        ) : (
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-500"
            aria-hidden="true"
          >
            {club.name.slice(0, 3).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-navy">{club.name}</h2>
          {club.foundedYear !== null && (
            <p className="text-sm text-muted">
              Fundado en {club.foundedYear}
            </p>
          )}
          <p className="text-sm text-muted">ID interno: {club.id}</p>
        </div>
      </div>

      {/* whitespace-pre-line respeta los saltos de línea que el usuario
          escribió en el textarea: HTML por defecto los colapsa. */}
      {club.description && (
        <p className="mt-6 whitespace-pre-line text-sm text-slate-700">
          {club.description}
        </p>
      )}

      <div className="mt-6 flex gap-2">
        <Button variant="secondary" onClick={() => navigate('/clubes')}>
          Volver
        </Button>
        {/* Mandamos el club en el state para que el formulario
            se precargue sin pedirlo de nuevo. */}
        <Button
          variant="primary"
          onClick={() =>
            navigate(`/clubes/editar/${club.id}`, { state: club })
          }
        >
          Editar
        </Button>
      </div>
    </article>
  )
}