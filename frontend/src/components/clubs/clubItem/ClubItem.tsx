import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../shared/button/Button'
import ConfirmModal from '../../confirmModal/ConfirmModal'
import type { Club } from '../../../types/club'

// Input properties: el club entra por props, ClubItem no lo pide al servidor.
// Output properties: onEdit y onDelete son callbacks del padre; este componente
// sólo avisa qué quiso hacer el usuario y ClubList decide qué significa.
interface ClubItemProps {
  club: Club
  onEdit: (club: Club) => void
  onDelete: (id: number) => void
}

export default function ClubItem({ club, onEdit, onDelete }: ClubItemProps) {
  // Estado local: el modal es efímero, no hace falta una ruta para él
  // (nadie quiere compartir el link de "¿estás seguro?").
  // Vive acá y no en ClubList para que cada tarjeta tenga el suyo.
  const [confirmOpen, setConfirmOpen] = useState(false)
  // El logo es una URL externa: si falla la carga volvemos al badge
  // de iniciales en vez de mostrar la imagen rota del navegador.
  const [logoFailed, setLogoFailed] = useState(false)
  const navigate = useNavigate()

  // Cerramos el modal antes de avisar hacia arriba, así la tarjeta
  // no queda con el diálogo abierto mientras se procesa el borrado.
  const handleConfirmDelete = () => {
    setConfirmOpen(false)
    onDelete(club.id)
  }

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        {/* Si el club no tiene logo (o la URL falla), armamos el badge
            con las iniciales del nombre. */}
        {club.logoUrl && !logoFailed ? (
          <img
            src={club.logoUrl}
            alt={`Escudo de ${club.name}`}
            onError={() => setLogoFailed(true)}
            className="h-12 w-12 shrink-0 rounded-full object-contain"
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500"
            aria-hidden="true"
          >
            {club.name.slice(0, 3).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="font-semibold text-navy">{club.name}</h2>
          {club.foundedYear !== null && (
            <p className="text-xs text-muted">Fundado en {club.foundedYear}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(`/clubes/${club.id}`)}
        >
          Ver detalle
        </Button>
        {/* Mandamos el club entero hacia arriba: ClubList lo va a pasar
            en el state de la navegación para precargar el formulario. */}
        <Button variant="primary" size="sm" onClick={() => onEdit(club)}>
          Editar
        </Button>
        {/* Este botón NO borra: abre el modal. El borrado real
            ocurre recién en handleConfirmDelete. */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => setConfirmOpen(true)}
        >
          Eliminar
        </Button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Eliminar club"
        message={`¿Estás seguro de que querés eliminar "${club.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </article>
  )
}