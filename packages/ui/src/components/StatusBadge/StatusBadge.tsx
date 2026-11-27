
import type { ReactNode } from 'react'
import './StatusBadge.css'

export type StatusTone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export interface StatusBadgeProps {
  children: ReactNode
  tone?: StatusTone
  dot?: boolean
}

export function StatusBadge({
  children,
  tone = 'neutral',
  dot = true,
}: StatusBadgeProps) {
  return (
    <span className={`qa-status-badge qa-status-badge--${tone}`}>
      {dot && (
        <span
          className="qa-status-badge-dot"
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  )
}
