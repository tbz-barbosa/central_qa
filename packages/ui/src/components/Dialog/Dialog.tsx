
import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

import { Button } from '../Button/Button'
import './Dialog.css'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}

interface DialogSurfaceProps extends DialogProps {
  variant: 'modal' | 'drawer'
}

function DialogSurface({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant,
}: DialogSurfaceProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    }

    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={`qa-dialog qa-dialog--${variant}`}
      aria-labelledby={titleId}
      aria-describedby={
        description ? descriptionId : undefined
      }
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
    >
      <header className="qa-dialog-header">
        <div className="qa-dialog-heading">
          <h2 id={titleId}>{title}</h2>

          {description && (
            <p id={descriptionId}>
              {description}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          aria-label="Fechar"
          title="Fechar"
          icon={<X size={20} aria-hidden="true" />}
          onClick={onClose}
        />
      </header>

      <div className="qa-dialog-body">
        {children}
      </div>

      {footer && (
        <footer className="qa-dialog-footer">
          {footer}
        </footer>
      )}
    </dialog>
  )
}

export function Modal(props: DialogProps) {
  return <DialogSurface {...props} variant="modal" />
}

export function Drawer(props: DialogProps) {
  return <DialogSurface {...props} variant="drawer" />
}
