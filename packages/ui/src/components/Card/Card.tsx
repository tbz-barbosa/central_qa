
import type { HTMLAttributes } from 'react'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean
}

export function Card({
  children,
  compact = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`qa-card ${compact ? 'qa-card--compact' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
